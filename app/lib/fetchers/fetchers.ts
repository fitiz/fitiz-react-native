import axios from 'axios';

export async function get<T>( path: string, options?: any ) : Promise<T> {
    const { data } = await axios.get( path, options );
    return data;
}

export async function patch<T>( path: string, body: any, options?: any ) : Promise<T> {
    const { data } = await axios.patch( path, body, options );
    return data;
}
