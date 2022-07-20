import axios from "axios";

class AddressBookService {
  baseUrl = "http://localhost:8080/addressbookservice/";
  addContact(data) {
    return axios.post(`${this.baseUrl}create/`, data);
  }
  getAllContacts() {
    return axios.get(`${this.baseUrl}`);
  }
  deleteContact(id) {
    axios.delete(`${this.baseUrl}delete/${id}`);
  }
  updateContact(data, id) {
    return axios.put(`${this.baseUrl}update/${id}`, data);
  }
  getContact(id) {
    return axios.get(`${this.baseUrl}get/${id}`);
  }
}
export default new AddressBookService();
