import { reactive } from "vue";

export const cartstore = reactive({
  currentUserId: null,
  cartItems: [],

  async init(userId) {
    if (!userId) {
      console.error("Erro: `userId` está indefinido.");
      return;
    }
    this.currentUserId = userId;
    await this.updateCartFromAPI();
  },

  async updateCartFromAPI() {
    if (!this.currentUserId) {
      console.warn("currentUserId não definido.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/api/cart/${this.currentUserId}`);
      if (!response.ok) throw new Error(`Erro ao buscar carrinho: ${response.status}`);

      const data = await response.json();

      this.cartItems = data.itens || [];
    } catch (error) {
      console.error("Erro ao buscar carrinho da API:", error);
      this.cartItems = [];
    }
  },

  async removeFromCart(produtoId) {
    try {
      const usuario_id = this.currentUserId;
  
      const response = await fetch(
        `http://localhost:4000/api/cart/remove/${produtoId}?usuarioId=${usuario_id}`,
        { method: "DELETE" }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao remover produto");
      }
  
      await this.updateCartFromAPI();
    } catch (error) {
      console.error("Erro ao remover produto do carrinho:", error);
    }
  }
});
