import App from "./app/app"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import { Auth0Provider } from "react-native-auth0"
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider } from "app/context/AuthContext"
import { AUTH0_DOMAIN, AUTH0_CLIENTID } from "@env"
import { UniversalProvider } from "app/providers/universalProvider"
SplashScreen.preventAutoHideAsync()



function IgniteApp() {
  return (
        <UniversalProvider>
                <App hideSplashScreen={SplashScreen.hideAsync} />
        </UniversalProvider>
   )
}

export default IgniteApp
