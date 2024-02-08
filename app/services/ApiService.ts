import { api } from 'app/services/api';

interface APITestMessageResponse  {
    message: string;
}
const ApiService = {

    testMessage: async (token: string) => {
        api.apisauce.setHeader('Authorization', `Bearer ${token}`);
        console.log("apisauce", api.apisauce)
        const response = await api.apisauce.get<APITestMessageResponse>('private/explore/hello');
        console.log(response.data)
        return response.data;
    }
}

export default ApiService;
