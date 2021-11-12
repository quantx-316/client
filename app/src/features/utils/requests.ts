import axios from 'axios';
import {authConfig} from './auth';

class requests {

    static authGet(url: string) {
        //@ts-ignore
        return axios.get(url, authConfig());
    }

    static authPost(url: string, data?: any) {
        //@ts-ignore 
        return axios.post(url, data, authConfig());
    }

    static authPut(url: string, data: any) {
        //@ts-ignore 
        return axios.put(url, data, authConfig());
    }

    static authDelete(url: string) {
        //@ts-ignore 
        return axios.delete(url, authConfig());
    }

}

export default requests;
