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
    const { authorize, clearSession, user }  = useAuth0();

    return user == null ? 
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

