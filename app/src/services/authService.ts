import axios, {AxiosResponse} from "axios";

import {tokenURL, userURL} from '../constants';

const querystring = require('querystring');


class authService {

  static login(email: string, password: string) {
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

    return axios
            .post(tokenURL, query, config)
            .then((res) => {

              console.log('res');
              console.log(res);

              //@ts-ignore
              if (res.data.access_token) {
                //@ts-ignore 
                localStorage.setItem("access", JSON.stringify(res.data.access_token));
                //@ts-ignore
                localStorage.setItem("user", JSON.stringify(res.data.user));
              }

              return res.data;
            });
  }

  static logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    localStorage.removeItem("editorConfig")
  }

  static register(email: string, username: string, password: string) {
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

    return axios.post(userURL, data, config);
  }

  static async test() {
    const res = await axios.post("localhost:29134");
    console.log(res);
  }

}

export default authService;