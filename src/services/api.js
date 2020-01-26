import axios from 'axios';

const api = axios.create({
  baseURL: 'https://devradar-obraia-backend.herokuapp.com'
});

export default api;