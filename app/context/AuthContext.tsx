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
    //§const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>("h");

    const { authorize, clearSession, getCredentials } = useAuth0();

    useEffect(() => {
        const checkToken = async () => {
            try {
                //check for valid token - if valid, set isAuthenticated to true
                const credentials = await getCredentials();
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

//async function refreshToken(credentials: Credentials, setAccessToken: (token: string) => void) {
//    const { accessToken, refreshToken } = credentials;
//    const token = refreshToken ? refreshToken : accessToken;
//
//    const tokenData = {
//        grant_type: 'refresh_token',
//        client_id: AUTH0_CLIENT_ID,
//        refresh_token: token,
//    };
//
//    const response = await axios.post(AUTH0_DOMAIN + 'oauth/token', tokenData);
//
//    const { access_token } = response.data;
//
//    setAccessToken(access_token);
//    return access_token;
//}
//
//
//const wellKnownURL = AUTH0_DOMAIN + '.well-known/jwks.json';
//const decodeToken = async (token: string) => {
//
//    const jwks = await getRemoteJWKSet(wellKnownURL);
//    const { protectedHeader, payload } = await verifyJwt(token, jwks);
//    console.log("Protected header:", protectedHeader);
//    console.log("Payload:", payload);
//    return payload;
//}

