import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://compar.herokuapp.com/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL);
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
}

export default new UserService();
