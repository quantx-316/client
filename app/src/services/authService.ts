import axios, {AxiosResponse} from "axios";

import {tokenURL, userURL} from '../constants';

const querystring = require('querystring');


class authService {

  static async login(email: string, password: string) {
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const config = {
      headers: headers,
    };

    const data = {
      'grant_type': 'password',
      'username': email, 
      'password': password, 
    }

    const query = querystring.stringify(data);

    const res = await axios.post(tokenURL, query, config);

    //@ts-ignore
    const accessToken = res.data.access_token;
    console.log(accessToken);
    
    localStorage.setItem("user", JSON.stringify(accessToken));

    return res; 
  }

  static async logout() {
    localStorage.removeItem("user");
  }

  static async register(email: string, username: string, password: string) {
    const headers = {
      'accept': 'application/json',
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    }

    const data = {
      email: email, 
      username: username, 
      password: password,
    }

      const res = await axios.post(userURL, data, config);

      return res; 
  }

  static async test() {
    const res = await axios.post("localhost:29134");
    console.log(res);
  }

}

export default authService;