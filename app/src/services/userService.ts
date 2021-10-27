import axios from 'axios';
import requests from '../features/utils/requests';
import {userURL} from '../constants';
import {User} from '../features/types/user';

class userService {
    static getCurrentUser() {
        const url = userURL + "current/";
        return requests.authGet(url);
    }

    static getUser(username: string) {
        const url = userURL + "?username=" + username; 
        return requests.authGet(url);
    }

    static getUsers() {
        const url = userURL + "all/";
        return requests.authGet(url);
    }

    static updateUser(new_user: User) {
        return requests.authPut(userURL, new_user);
    }

}

export default userService; 
