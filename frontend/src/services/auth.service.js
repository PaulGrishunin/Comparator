import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", {"user":{
                email,
                password
            }
            })
            .then(response => {
                if (response.data.user.token) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password) {
        return axios.post(API_URL + "register", {"user": {
                username,
                email,
                password
            }
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
