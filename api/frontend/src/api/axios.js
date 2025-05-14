import axios from 'axios';
import Cookies from 'js-cookie'; // npm install js-cookie

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

let csrfFetched = false;

instance.interceptors.request.use(async (config) => {
  const method = config.method.toLowerCase();
  const needsCsrf = ['post', 'put', 'patch', 'delete'].includes(method);

  if (needsCsrf && !csrfFetched) {
    try {
      await axios.get(process.env.REACT_APP_CSRF_COOKIE_URL, {
        withCredentials: true
      });
      csrfFetched = true;
    } catch (err) {
      console.error('Erro ao buscar CSRF cookie:', err);
    }
  }

  const xsrfToken = Cookies.get('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }

  return config;
}, error => Promise.reject(error));

export default instance;
