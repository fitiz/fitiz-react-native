
import {  useEffect, useState, useContext, createContext } from 'react'
import { UserFitnessMetrics } from 'types/metrics';
import { useSensorsData } from 'app/context/SensorsContext';
import { User, useAuth0 } from 'react-native-auth0';
import { AccelerometerMeasurement } from 'expo-sensors';
import { PedometerResult } from 'expo-sensors/build/Pedometer';
import { saveString, loadString, remove} from 'app/utils/storage';
import { MetricsModal } from 'app/components/MetricsModal';


const STRIDE_FACTOR = 0.414;
const GRAVITY = 9.81;
const VELOCITY_FROM_MS_TO_KMH = 3.6; 



interface MetricsContextType {
    userFitnessMetrics: UserFitnessMetrics 
    isModalVisible: boolean;
    setHeightAndWidth: (height: number, weight: number) => void;
    openModal: () => void;
    closeModal: () => void;
}


const MetricsContext = createContext<MetricsContextType>({ 
    userFitnessMetrics:{},
    isModalVisible: false,
    setHeightAndWidth: () => {},
    openModal: () => {},
    closeModal: () => {}
});

export const useMetrics = () => useContext(MetricsContext) ;

type MetricsProviderProps = {
    children: React.ReactNode;
}
export const MetricsProvider: React.FC<MetricsProviderProps> = ({ children }) => {
    const { 
        accelerometerData, 
        pedometerData, 
        isAccelerometerAvailable, 
        isPedometerAvailable, 
        hasPedometerPermissions, 
        hasAccelerometerPermissions, 
        startDate, 
        endDate,
        getStepsForTimePeriod
    } = useSensorsData(); 

    const { user } = useAuth0();
    const [userFitnessMetrics, setUserFitnessMetrics] = useState<UserFitnessMetrics>({});
    const [isModalVisible, setIsModalVisible] = useState(false);

     const [heightAndWidthAreSet, setHeightAndWidthAreSet] = useState(false);
       const setHeightAndWidth = (height: number, weight: number) => {
        setIsModalVisible(false);
        setHeightAndWidthAreSet(true);

        saveString('height', height.toString());
        saveString('weight', weight.toString());

        setUserFitnessMetrics((prev) => {
            return { ...prev, height: height, weight: weight};
        });
    }
        
    const closeModal = () => {
        setIsModalVisible(false);
    }

    const openModal = () => {
        //wait 1 second for screens to load
        //(otherwise the modal will be rendered before the screens are loaded and the app gets stuck on splashscreen)
        setTimeout(() => setIsModalVisible(true), 1000);
    }

    const calculateMetrics = async (
        startDate: Date, 
        endDate:Date, 
        user: User | null,
        currentMetrics: UserFitnessMetrics,
        accelerometerData?: AccelerometerMeasurement[], 
        pedometerData?: PedometerResult
    ) => {
    
        const userId = extractId(user);
        const stepCount = pedometerData?.steps || 0;
    
        const stride = calculateStride(currentMetrics?.height || 0);
        const distanceTotalDistance = calculateDistance(stride, stepCount) / 1000; //in km
        //const avgLinearAcceleration = calculateAvgLinearAcceleration(accelerometerData || []);
    
        //calculate current speed
        const now = new Date();
        const fiveSecEarlier = new Date();
        fiveSecEarlier.setTime(now.getTime() - 5000);
        const fiveSecEarlierSteps = await getStepsForTimePeriod(fiveSecEarlier, now);

        const distanceFor5SecTimePeriod = calculateDistance(stride, fiveSecEarlierSteps?.steps || 0);
        const timeInSec = 5;
        const speed = calculateSpeed(distanceFor5SecTimePeriod, timeInSec);
        const speedInKmh = speed * VELOCITY_FROM_MS_TO_KMH;
        const pace = calculatePace(distanceFor5SecTimePeriod, timeInSec); //in s/m

        const MET_SLOW = 2.8;
        const MET_AVG = 3.5;
        const MET_FAST = 5;

        const avg_walking_speed_inKmh = 5;
        const timeSpentWalkingAvg = distanceTotalDistance / avg_walking_speed_inKmh;

        const calories = MET_AVG * (currentMetrics?.weight || 0) * timeSpentWalkingAvg;
        const timeInMin = timeInSec / 60;
        const distanceInKm = distanceFor5SecTimePeriod / 1000;
        const paceInMinPerKm = calculatePace(distanceInKm, timeInMin); //in min/km
        
        
        setUserFitnessMetrics((prev) =>{
            return { 
                ...prev,
                userId: userId,
                stepCount: stepCount,
                startTimestamp: startDate,
                endTimestamp: endDate, 
                height: currentMetrics.height, //in cm
                weight: currentMetrics.weight, //in cm
                distanceTotal: distanceTotalDistance, //in m
                speedKmH: speedInKmh, //in km/h
                speed: speed, //in m/s
                pace: pace, //in s/m
                calories: calories, //in kcal
            }
        });
    }


    
    const loadHeightAndWeightFromStorage = async () => {
        remove('height');
        remove('weight');
        const height = await loadString('height');
        const weight = await loadString('weight');
        if (height && weight) {
            setHeightAndWidth(parseInt(height), parseInt(weight));
            setHeightAndWidthAreSet(true);
            return true;
        }

        return false;
    }
    useEffect(() => {
        loadHeightAndWeightFromStorage();
        if (!isModalVisible && !heightAndWidthAreSet){
            openModal();
        }


        const intervalId = setInterval(() => {
            if (isPedometerAvailable && isAccelerometerAvailable && hasPedometerPermissions && hasAccelerometerPermissions) {
                calculateMetrics(startDate, endDate, user, userFitnessMetrics, accelerometerData, pedometerData);
            }
        }, 5000);


        return () => { 
            clearInterval(intervalId);
        }

    }, [isModalVisible ]);

    return (
        <MetricsContext.Provider value={{ 
            userFitnessMetrics, 
            isModalVisible, 
            setHeightAndWidth, 
            openModal, 
            closeModal
        }}>
            {user && <MetricsModal visible={isModalVisible} onClose={closeModal} setHeightAndWidth={setHeightAndWidth}  />}
            {children}
        </MetricsContext.Provider>
    )

}





//******HELPER FUNCTIONS*********
//********************************
//********************************


const _convertVelocityFromMsToKmh = (velocity: number): number=> {
    return velocity * VELOCITY_FROM_MS_TO_KMH;
}


const _calculateAvgLinearAcceleration = (accelerometerData: AccelerometerMeasurement[]): number=> {
    let velocity = 0;
    if (accelerometerData.length <= 0) {
        return velocity;
    }
    for (let i = 1; i < accelerometerData.length; i++) {
        const dataOne = accelerometerData[i];
        const dataTwo = accelerometerData[i - 1];

        const accelerationOne = Math.sqrt(dataOne.x * dataOne.x + dataOne.y * dataOne.y + dataOne.z * dataOne.z); //m/s^2
        //const accelerationTwo = Math.sqrt(dataTwo.x * dataTwo.x + dataTwo.y * dataTwo.y + dataTwo.z * dataTwo.z); //m/s^2

        const deltaTime = dataOne.getTime() - dataTwo.getTime(); // in milliseconds
        const deltaTimeInSeconds = deltaTime / 1000; // in seconds


        velocity += accelerationOne * deltaTimeInSeconds;//velocity in m/s
    }

    return Math.abs( (velocity / (accelerometerData.length - 1)) - GRAVITY);
}

//in m/s
const calculateSpeed = (distance: number, time: number): number=> {
    if (time <= 1) {
        return 0;
    }
    return distance / time;
}


const calculatePace = (distance: number, time: number): number=> {
    if (distance <= 0.1) {
        return 0;
    }
    return time / distance;
}


const calculateStride = (height: number) : number=> {
    return height * STRIDE_FACTOR;
}


// distance in meters
const calculateDistance = (stride: number, steps: number) : number=> {
    return (stride * steps) / 100;
}

const extractId = (user: User | null) : string | undefined => {
    if (!user) {
        return undefined;
    }
    const id = user.sub?.split('|')[1];
    return id;
}
