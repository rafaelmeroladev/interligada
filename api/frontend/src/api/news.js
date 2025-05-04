import axios from 'axios';

const API_BASE = 'http://localhost:8000/api'; // coloca aqui o base da sua API

export const getNews = async () => {
  try {
    const response = await axios.get(`${API_BASE}/notices`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
};