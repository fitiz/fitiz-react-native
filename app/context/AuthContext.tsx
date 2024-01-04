import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';


interface AuthContextData {
    isAuthenticating: boolean;
    isLoaded: boolean;
    login: () => Promise<void>;
    logout: () => void;
}



const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    //§const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                //check for valid token - if valid, set isAuthenticated to true
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }

        };

        checkToken();
    }, []);

    const login = async () => {

        const { authorize } = useAuth0();
        try {
             await authorize();
        } catch (e) {
            console.log("Login error:", e);
        }
    };

    const logout = async  () => {
        const { clearSession } = useAuth0();
        try {
            await clearSession();
        } catch (e) {
            console.log("Logout error:", e);
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticating: isLoading, isLoaded: !isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}



const LoginButton = () => {
    const {authorize} = useAuth0();

    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log in" />
}


const LogoutButton = () => {
    const {clearSession} = useAuth0();

    const onPress = async () => {
        try {
            await clearSession();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log out" />
}


