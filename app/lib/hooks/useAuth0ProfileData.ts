
import { useState, useEffect} from 'react';
import { Profile, APIResponse} from 'types/profile';
import { get } from '../fetchers/fetchers';
import { AUTH0_DOMAIN } from "@env";


export const useAuth0ProfileData = (token: string) => {
    const [profile, setProfile] = useState<Profile | null>(null);

    const getProfile = async (token: string) => {
        const options = {
            headers: {
                method: 'GET',
                Authorization: `Bearer ${token}`,
            },
        };
        const profile = await get<Profile>(AUTH0_DOMAIN + 'userinfo', options)
        setProfile(profile);
    };
    
    useEffect(() => {
        getProfile(token);
    },[]); 


    return profile;
}
