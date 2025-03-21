import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

export const login = async (email: string, senha: string) => {
  return axios.post(`${API_URL}/login`, { email, senha });
};

export const cadastrar = async (data: { nome: string; email: string; senha: string }) => {
  return axios.post(`${API_URL}/register`, data);
};
