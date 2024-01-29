import { useState } from 'react';
import { get } from 'app/lib/fetchers/fetchers';
import { AUTH0_DOMAIN } from '@env';

export const useFitnessMetrics = (token: String) => {
    const [metrics, setMetrics] = useState();

    const getFitnessMetrics = async () => {
        const options = { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        const data = await get('https://localhost:5001/api/private/fitnessmetrics', options);
        setMetrics(data);
    }


    useEffect(() => {
        getFitnessMetrics();
    },[]);


    return metrics;
}
