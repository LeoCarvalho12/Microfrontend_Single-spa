import axios from "axios";

const API_URL = "http://localhost:4000/api/cart";

export const getCart = async (userId: string) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const addToCart = async (userId: string, produtoId: number) => {
  return axios.post(`${API_URL}/add`, { userId, produtoId, quantidade: 1 });
};

export const removeFromCart = async (produtoId: number, userId: string) => {
  if (!produtoId || !userId) {
    console.error("Erro: produtoId ou userId inválido na remoção do carrinho.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/cart/remove/${produtoId}?usuarioId=${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao remover produto do carrinho.");
    }
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
  }
};

