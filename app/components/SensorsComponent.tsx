import { SensorsContext } from 'app/context/SensorsContext';
import React, { useContext } from 'react';
import { Text, Button} from 'react-native';

export const SensorsWarningComponent = () => {
    const { accelerometerData, pedometerData, isAccelerometerAvailable, isPedometerAvailable, hasPedometerPermissions, hasAccelerometerPermissions, checkAndRequestPedometerPermissions, checkAndRequestAccelerometerPermissions } = useContext(SensorsContext);

    const AccelerometerNotAvailable = () => !isAccelerometerAvailable && <Text>Your device does not support accelerometer and cannot be used for tracking your fitness metrics</Text>;
    const PedometerNotAvailable = () => !isPedometerAvailable && <Text>Your device does not support pedometer and cannot be used for tracking your fitness metrics.</Text>;
    const AccelerometerNotPermitted = () => isAccelerometerAvailable && !hasAccelerometerPermissions && <Text>You have not granted permission to use accelerometer. Please go to settings and grant permission to use accelerometer.</Text>;
    const PedometerNotPermitted = () => isPedometerAvailable && !hasPedometerPermissions && <Text>You have not granted permission to use pedometer. Please go to settings and grant permission to use pedometer.</Text>;
    const PedometerWorking = () => isPedometerAvailable && hasPedometerPermissions && pedometerData && <Text>Pedometer is working: {JSON.stringify(pedometerData)}</Text>;
    //const AccelerometerWorking = () => isAccelerometerAvailable && hasAccelerometerPermissions && accelerometerData && <Text>Accelerometer is working: {JSON.stringify(accelerometerData)}</Text>;


    return (
        <>
            <AccelerometerNotAvailable />
            <PedometerNotAvailable />
            <AccelerometerNotPermitted />
            { !hasAccelerometerPermissions &&
                <Button title="Grant permission to use accelerometer" onPress={checkAndRequestAccelerometerPermissions} /> }
            <PedometerNotPermitted /> 
            { !hasPedometerPermissions &&
                <Button title="Grant permission to use pedometer" onPress={checkAndRequestPedometerPermissions} /> }
            <PedometerWorking />
        </>
    );
}
