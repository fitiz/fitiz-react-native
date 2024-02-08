import React from 'react';
import { useAuth0 } from 'react-native-auth0';
import { AppBottomTabNavigator } from './AppBottomTabNavigator';
import { AppNavigator } from './AppNavigator';

interface RootNavigatorProps {
    linking: any;
    initialState: any;
    onStateChange: any;
}

const RootNavigator: React.FC<RootNavigatorProps> = ({linking, initialState, onStateChange } : RootNavigatorProps) => {
    const { user }  = useAuth0();

    //disable auth0 temporary to test pedometer
    //(auth0 doesn't work with Expo Go and i can access pedometer on my iphone through Expo Go)
    const skip = true;
    return user == null && skip ? 
        <AppNavigator 
        linking={linking} 
        initialState={initialState} 
        onStateChange={onStateChange} /> 
        : 
        <AppBottomTabNavigator 
        linking={linking} 
        initialState={initialState} 
        onStateChange={onStateChange} /> 
    
};


export default RootNavigator;

