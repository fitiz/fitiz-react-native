import axios, {AxiosResponse } from 'axios';
import { useAuth0 } from "react-native-auth0";
import { Credentials } from 'types/security';

interface TestMessageResponse {
    testMessage: string;
}

export const fetchTestMessage = async (fn: (input) => Promise<Credentials>) : Promise<string> => {

    //const { getCredentials } = useAuth0();

    //get JWT access token
    const credentials : Credentials | undefined = await fn;

    const options = {
        method: 'GET',
        url : 'http://localhost:8080/private',
        headers: {
            Authorization: `Bearer ${credentials?.accessToken}`
        }
    };
    return axios.request<TestMessageResponse>(options).then((response: AxiosResponse) => response.data).catch((error) => { console.log(error); });
};
