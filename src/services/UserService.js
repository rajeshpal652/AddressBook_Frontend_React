import axios from "axios";

class UserService {
  baseUrl = "http://localhost:8080/userregistration/";

  signup(data) {
    return axios.post(`${this.baseUrl}create/`, data);
  }

  login(data) {
    return axios.post(`${this.baseUrl}login/`, data);
  }
}
export default new UserService();
