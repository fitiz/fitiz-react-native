import App from "./app/app"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import { LogBox } from 'react-native';
import { UniversalProvider } from "app/providers/universalProvider"
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

SplashScreen.preventAutoHideAsync().then(r => console.log("SplashScreen.preventAutoHideAsync:", r));



function IgniteApp() {
  return (
        <UniversalProvider>
                <App hideSplashScreen={SplashScreen.hideAsync} />
        </UniversalProvider>
   )
}

export default IgniteApp
