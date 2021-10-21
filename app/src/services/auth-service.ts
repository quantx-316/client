import axios, {AxiosResponse} from "axios";

const API_URL = "http://localhost:8080/";


class AuthService {
  login (email: string, password: string, user_id: number) {
    return axios
      .get(API_URL + `/users/${user_id}`, { data: { email, password }})
      .then((response: AxiosResponse) => {
        const { data }: any = response
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email:string, password: string) {
    return axios.post(API_URL + "/users/", {
      email,
      password,
    });
  }
}

export default new AuthService();