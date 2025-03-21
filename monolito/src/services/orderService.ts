import axios from "axios";

const API_URL = "http://localhost:4000/api/order";

export const createOrder = async (userId: string, valorTotal: number) => {
  return axios.post(`${API_URL}/create`, { userId, valorTotal });
};
