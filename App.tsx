import App from "./app/app"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import { Auth0Provider } from "react-native-auth0"


SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return (
    <Auth0Provider domain={"dev-mewzvus7n0bttt3p.us.auth0.com"} clientId={"ywbYNfyGkbDLJ0nUcC5lNmkRtHNKHHWU"}>
        <App hideSplashScreen={SplashScreen.hideAsync} />
    </Auth0Provider>
   )
}

export default IgniteApp
