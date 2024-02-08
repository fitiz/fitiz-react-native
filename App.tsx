import App from "./app/app"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import { Auth0Provider } from "react-native-auth0"
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider } from "app/context/AuthContext"
import { AUTH0_DOMAIN, AUTH0_CLIENTID } from "@env"
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

SplashScreen.preventAutoHideAsync().then(r => console.log("SplashScreen.preventAutoHideAsync:", r));

const theme = {
    ...DefaultTheme,
};

function IgniteApp() {
  return (
    <PaperProvider theme={theme}>
        <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENTID}>
            <AuthProvider>
                <App hideSplashScreen={SplashScreen.hideAsync} />
            </AuthProvider>
        </Auth0Provider>
    </PaperProvider>
   )
}

export default IgniteApp
