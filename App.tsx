import App from "./app/app"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import { Auth0Provider } from "react-native-auth0"
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

SplashScreen.preventAutoHideAsync()


const theme = {
    ...DefaultTheme,
};

function IgniteApp() {
  return (
    <PaperProvider theme={theme}>
        <Auth0Provider domain={"dev-mewzvus7n0bttt3p.us.auth0.com"} clientId={"ywbYNfyGkbDLJ0nUcC5lNmkRtHNKHHWU"}>
            <App hideSplashScreen={SplashScreen.hideAsync} />
        </Auth0Provider>
    </PaperProvider>
   )
}

export default IgniteApp
