import axios from 'axios';
import requests from '../features/utils/requests';
import {userURL} from '../constants';
import {User} from '../features/types/user';

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

    static async getUsers() {
        const url = userURL + "all/";
        const res = await requests.authGet(url);
        console.log(res);
        return res; 
    }

    static async updateUser(new_user: User) {
        const res = await requests.authPut(userURL, new_user);

        console.log(res);
        return res;  
    }

}

export default userService; 
