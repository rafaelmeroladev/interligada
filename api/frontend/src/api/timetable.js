import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const getTimetable = async () => {
  try {
    const response = await axios.get(`${API_BASE}/listahorarios`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar programação:', error);
    return [];
  }
};
