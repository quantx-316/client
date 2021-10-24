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

    const res = await axios.post(tokenURL, query, config)

    if (res.status === 200) {

    }

  }

  static async logout() {

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

    console.log(res);

  }


  // login (email: string, password: string, user_id: number) {
  //   return axios
  //     .get(API_URL + `/users/${user_id}`, { data: { email, password }})
  //     .then((response: AxiosResponse) => {
  //       const { data }: any = response
  //       if (data.accessToken) {
  //         localStorage.setItem("user", JSON.stringify(data));
  //       }

  //       return response.data;
  //     });
  // }

  // logout() {
  //   localStorage.removeItem("user");
  // }

  // register(email:string, password: string) {
  //   return axios.post(API_URL + "/users/", {
  //     email,
  //     password,
  //   });
  // }


}

export default authService;