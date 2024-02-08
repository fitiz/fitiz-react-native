
import { Auth0Provider } from 'react-native-auth0';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider } from "app/context/AuthContext"
import { AUTH0_DOMAIN, AUTH0_CLIENTID } from "@env"
import { SensorsProvider } from "app/context/SensorsContext"
import { MetricsProvider } from "app/context/MetricsContext"

const theme = {
    ...DefaultTheme,
};


export const UniversalProvider = ({ children }: any) => {
    return (
        <PaperProvider theme={theme}>
            <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENTID}>
                <AuthProvider>
                    <SensorsProvider>
                        <MetricsProvider>
                            {children}
                        </MetricsProvider>
                    </SensorsProvider>
                </AuthProvider>
            </Auth0Provider>
        </PaperProvider>
    )
}
