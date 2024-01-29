import { createContext, useState, useEffect, useContext } from 'react'
import { Accelerometer, AccelerometerMeasurement, Pedometer} from 'expo-sensors'
import { PedometerResult, Subscription } from 'expo-sensors/build/Pedometer';
import { Linking, Alert, Platform } from 'react-native';


const MAX_DATA_LENGTH = 10; 

interface SensorsContextType {
    MAX_DATA_LENGTH: number;
    accelerometerData?: AccelerometerMeasurement[];
    pedometerData?: PedometerResult;
    isAccelerometerAvailable: boolean;
    isPedometerAvailable: boolean;
    hasPedometerPermissions: boolean;
    hasAccelerometerPermissions: boolean;
    startDate: Date;
    endDate: Date;
    getStepsForTimePeriod: (start: Date, end: Date) => Promise<PedometerResult | null>;

}

type SensorsProviderProps = {
    children: React.ReactNode;
}

const openSettings = () => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
    } else {
        Linking.openSettings();
    }
};
 

export const SensorsContext = createContext<SensorsContextType>({
    MAX_DATA_LENGTH,
    isAccelerometerAvailable: false,
    isPedometerAvailable: false,
    hasPedometerPermissions: false,
    hasAccelerometerPermissions: false,
    startDate: new Date(),
    endDate: new Date(),
    getStepsForTimePeriod: async (start: Date, end: Date) =>  null,
})


export const useSensorsData = () => useContext(SensorsContext);

export const SensorsProvider: React.FC<SensorsProviderProps> = ({ children }) => {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
    const [isAccelerometerAvailable, setIsAccelerometerAvailable] = useState(false);

    const [hasPedometerPermissions, setHasPedometerPermissions] = useState(false);
    const [hasAccelerometerPermissions, setHasAccelerometerPermissions] = useState(false);

    const [accelerometerData, setAccelerometerData] = useState<AccelerometerMeasurement[]>([{x: 0, y: 0, z: 0}]);
    const [pedometerData, setPedometerData] = useState<PedometerResult>({ steps : 0});

    const [pedometerSubscription, setPedometerSubscription] = useState<Subscription | null>(null);
    const [accelerometerSubscription, setAccelerometerSubscription] = useState<Subscription | null>(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    //* Used to check if the sensors have loaded 
    //* - uppon initialization 'isAvailableAsync' returns false
    //* - after a few seconds it returns true
    //* - this is used to set an interval to check for availability
    //* - the number here is the number of times to check for availability
    //* - if not available after that many times, then it is considered not available
    //*

    const checkAndRequestPedometerPermissions = async () => {
        let permissions = await Pedometer.getPermissionsAsync();
    
        if (permissions && permissions.status === 'granted') {
            setHasPedometerPermissions(true);
            return true;
        } 

        permissions = await Pedometer.requestPermissionsAsync();

        if (permissions && permissions.status === 'granted') {
            setHasPedometerPermissions(true);
            return true;
        }

        if(!permissions.canAskAgain) {
            //The user has denied permissions and has selected to not be asked again
            //Direct them to the settings page

            Alert.alert(
                'Permission for Motion Tracking required',
                'Please go to settings and enable motion tracking to use this app',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => openSettings() },
                ],
            );
            return false;
        }
    

        setHasPedometerPermissions(permissions.status === 'granted');
        return permissions.status === 'granted';
    }
    
    const checkAndRequestAccelerometerPermissions = async () => {
        let permissions = await Accelerometer.getPermissionsAsync();
    
        if (permissions && permissions.granted) {
            setHasAccelerometerPermissions(true);
            return true;
        } 

    
        permissions = await Accelerometer.requestPermissionsAsync();

        if (permissions && permissions.granted) {
            setHasAccelerometerPermissions(true);
            return true;
        }

        setHasAccelerometerPermissions(false);
        return false;
    }

    const subscribePedometer = async () => {
        const pedometerIsAvailable = await Pedometer.isAvailableAsync();

        setIsPedometerAvailable(pedometerIsAvailable)

        if (!pedometerIsAvailable) {
            return;
        }
        //check for permissions

        const permissions = checkAndRequestPedometerPermissions();

        if (!permissions) {
            return;
        }
            
        if (!pedometerSubscription) {

            const start = new Date();
            start.setHours(0,0,0,0);
            setStartDate(start);


            const end = new Date();
            end.setHours(23,59,59,999);
            setEndDate(end);


            const result = await Pedometer.getStepCountAsync(start, end);
            setPedometerData(result);
            const pSubscription = Pedometer.watchStepCount(() => {
                Pedometer.getStepCountAsync(start, end).then((result) => {
                    setPedometerData(result);
                }).catch((error) => {
                    console.log("Error getting step count", error);
                });
            });
            setPedometerSubscription(pSubscription);
        }
    }

    const unsubscribePedometer = () => {
            pedometerSubscription && pedometerSubscription.remove();
            setPedometerSubscription(null);
    }

    //* configure subscription to accelerometer
    //*
    const subscribeAccelerometer = async () => {
        const accelerometerIsAvailable = await Accelerometer.isAvailableAsync();
        setIsAccelerometerAvailable(accelerometerIsAvailable);


        if(!accelerometerIsAvailable) {
            return;
        }

        const permissions = checkAndRequestAccelerometerPermissions();

        if(!permissions) {
            return;
        }

        Accelerometer.setUpdateInterval(2000);
        if (!accelerometerSubscription) {
            const aSubscription= Accelerometer.addListener(newData => {
                setAccelerometerData((prevData) => {
                    const combinedData = [...prevData, newData];
                    return combinedData.length > MAX_DATA_LENGTH ? combinedData.slice(5) : combinedData;
                });

            });
            setAccelerometerSubscription(aSubscription);
        }

    }


    //* safely unsubscribe from accelerometer
    //*
    //* 
    const unsubscribeAccelerometer = () => {
        accelerometerSubscription && accelerometerSubscription.remove();
        setAccelerometerSubscription(null);
    }



    const getStepsForTimePeriod = async (start: Date, end: Date) => {
        const isAvailable =  Pedometer.isAvailableAsync() 
        if (!isAvailable) {
            return null;
        }
        
        const permissions = await Pedometer.getPermissionsAsync();
        if (!permissions.granted) {
            return null;
        }
        const result = await Pedometer.getStepCountAsync(start, end);
        return result;
    }


    useEffect(() => {

        subscribePedometer();
        subscribeAccelerometer();

        const milisecUntilEnd = endDate.getTime() - startDate.getTime();
        

        //reset the current time period for pedometer  
        const timeoutId = setTimeout(() => {
            unsubscribePedometer();
            const start = new Date();
            start.setHours(0,0,0,0);
            setStartDate(start);
            const end = new Date();
            end.setHours(23,59,59,999);
            setEndDate(end);
        }, milisecUntilEnd + 1000);

        
        return () => {
            clearTimeout(timeoutId);
            unsubscribePedometer();
            unsubscribeAccelerometer();
        }
    }, [isPedometerAvailable, isAccelerometerAvailable, endDate]);

    return (
        <SensorsContext.Provider value={{ 
            MAX_DATA_LENGTH,
            accelerometerData, 
            pedometerData, 
            isAccelerometerAvailable, 
            isPedometerAvailable,
            hasPedometerPermissions,
            hasAccelerometerPermissions,
            startDate,
            endDate,
            getStepsForTimePeriod
        }}>
            {children}
        </SensorsContext.Provider>
    )

}


