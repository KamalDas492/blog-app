
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blog-app-backend-i55d.onrender.com/blog'
});
axios.defaults.withCredentials = true;
export default instance;
