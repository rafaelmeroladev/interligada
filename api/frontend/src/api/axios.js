// src/api/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,    // ex: http://localhost:8000/api
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

let csrfFetched = false;

// Pega CSRF cookie (Sanctum) antes de métodos “mutantes”
instance.interceptors.request.use(async config => {
  const method = config.method.toLowerCase();
  if (['post', 'put', 'patch', 'delete'].includes(method) && !csrfFetched) {
    try {
      await axios.get(process.env.REACT_APP_CSRF_COOKIE_URL, { withCredentials: true });
      csrfFetched = true;
    } catch (err) {
      console.error('Erro ao buscar CSRF cookie:', err);
    }
  }

  // injeta X-XSRF-TOKEN se existir
  const xsrfToken = Cookies.get('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }

  // 👉 Aqui: injeta o Bearer token se tiver
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));

export default instance;
