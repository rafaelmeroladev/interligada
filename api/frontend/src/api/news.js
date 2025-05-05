import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL; // coloca aqui o base da sua API

export const getNews = async () => {
  try {
    const response = await axios.get(`${API_BASE}/notices`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
};