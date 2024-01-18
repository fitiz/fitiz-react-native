import axios from 'axios';

export async function get<T>( path: string, options?: any ) : Promise<T> {
    const { data } = await axios.get( path, options );
    return data;
}
