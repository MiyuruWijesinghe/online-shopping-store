import axios from "axios";

const API_URL = "https://shopping-backend-api.herokuapp.com/auth/";

class AuthService {
  login(userName, password) {
    return axios
      .post(API_URL + "signin", {
        userName,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(roleName, firstName, lastName, addressLine1, addressLine2, addressLine3, phoneNumber, userName, conferenceId, email, password, dob, nic) {
    return axios.post(API_URL + "signup", {
      roleName,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      addressLine3,
      phoneNumber,
      conferenceId,
      userName,
      email,
      password,
      dob,
      nic
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
