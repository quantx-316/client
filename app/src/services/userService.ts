import axios from 'axios';
import requests from '../features/utils/requests';
import {userURL} from '../constants';

class userService {
    static async getCurrentUser() {
        const url = userURL + "current/";
        const res = await requests.authGet(url);
        console.log(res);
        return res; 
    }

    static async getUser(username: string) {
        const url = userURL + "?username=" + username; 
        const res = await requests.authGet(url);
        console.log(res);
        return res;
    }

}

export default userService; 
