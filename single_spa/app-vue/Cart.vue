<template>
  <div>
    <h1>🛒 Carrinho de Compras</h1>
    <router-link to="/product">← Voltar para Lista</router-link>

    <table v-if="cartProducts.length > 0" border="1" cellPadding="10" style="margin-top: 20px; width: 100%;">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cartProducts" :key="product.id">
          <td>{{ product.nome }}</td>
          <td>{{ product.quantity }}</td>
          <td>R$ {{ product.preco.toFixed(2) }}</td>
          <td>R$ {{ (product.preco * product.quantity).toFixed(2) }}</td>
          <td>
            <button class="btn btn-danger" @click="removeItem(product.id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Seu carrinho está vazio.</p>
    <button v-if="cartProducts.length > 0" class="btn btn-success" @click="goToPay">
      Ir para Pagamento →
    </button>
  </div>
</template>

<script>
import { cartstore } from "../cartstore"; 

export default {
  data() {
    return {
      cartItems: {},
      cartProducts: [],
    };
  },
  methods: {
    async updateCart() {
      this.cartItems = cartstore.getCart();
      const productIds = Object.keys(this.cartItems);

      if (productIds.length > 0) {
        try {
          console.log("Buscando produtos do carrinho...");
          const response = await fetch(`http://localhost:4000/api/products/details?ids=${productIds.join(",")}`);
          const products = await response.json();
          
          this.cartProducts = products.map(product => ({
            ...product,
            quantity: this.cartItems[product.id],
          }));
        } catch (error) {
          console.error("Erro ao buscar produtos do carrinho:", error);
        }
      } else {
        this.cartProducts = [];
      }
    },
    removeItem(id) {
      cartstore.removeFromCart(id);
      this.updateCart();
    },
    goToPay() {
      this.$router.push("/checkout/pay");
    }
  },
  created() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      cartstore.init(userId);
    } else {
      console.error("userId não definido no localStorage.");
    }
    this.updateCart();
    window.addEventListener("cart-updated", this.updateCart);
  },
  beforeUnmount() {
    window.removeEventListener("cart-updated", this.updateCart);
  },
};
</script>
