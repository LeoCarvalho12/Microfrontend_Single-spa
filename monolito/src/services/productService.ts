import axios from "axios";

const API_URL = "http://localhost:4000/api/products";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/product`);
  return response.data;
};
