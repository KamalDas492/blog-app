
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/blog'
});
axios.defaults.withCredentials = true;
export default instance;
