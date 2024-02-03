import { api } from 'app/services/api';

interface APITestMessageResponse  {
    message: string;
}
const ApiService = {

    //postUserMetrics: async (metrics) => {
    //    const response = await api.post('fitness-metrics-', metrics);
    //    return response.data;
    //}
    //
    testMessage: async (token: String) => {
        api.apisauce.setHeader('Authorization', `Bearer ${token}`);
        const response = await api.apisauce.get<APITestMessageResponse>('user-service/testMessage');
        return response.data;
    }
}

export default ApiService;
