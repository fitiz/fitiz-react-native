import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';

interface AuthContextData {
    isAuthenticated: boolean;
    isLoading: boolean;

    accessToken: string | null;
    login: () => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    // §const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>("h");

    const { authorize, clearSession, getCredentials } = useAuth0();

    useEffect(() => {
        const checkToken = async () => {
            try {
                // check for valid token - if valid, set isAuthenticated to true
                const credentials = await getCredentials();
                console.log("Credentials:", credentials);
                if (credentials) {
                    setAccessToken(credentials.accessToken);
                    setIsAuthenticated(true);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }

        };

        checkToken();
    }, []);

    const login = async () => {
        try {
             const credentials = await authorize();
             if (credentials) {
                setAccessToken(credentials.accessToken);
                setIsAuthenticated(true);
             }
        } catch (e) {
            console.log("Login error:", e);
        }
    };

    const logout = async  () => {
        try {
            await clearSession();
            setIsAuthenticated(false);
            setAccessToken(null);
        } catch (e) {
            console.log("Logout error:", e);
        }
    };

    return (
        <AuthContext.Provider
         value={{
            isAuthenticated,
            isLoading,
            accessToken,
            login,
            logout
         }}
        >
            {children}
        </AuthContext.Provider>
    );
}

