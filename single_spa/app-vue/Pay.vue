<template>
  <div>
    <h1>💳 Pagamento</h1>
    <router-link to="/checkout/cart">← Voltar para o Carrinho</router-link>
    <table v-if="cartProducts.length > 0" border="1" cellPadding="10" style="margin-top: 20px; width: 100%;">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cartProducts" :key="product.id">
          <td>{{ product.nome }}</td>
          <td>{{ product.quantity }}</td>
          <td>R$ {{ product.preco.toFixed(2) }}</td>
          <td>R$ {{ (product.preco * product.quantity).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <h3 v-if="cartProducts.length > 0">Total a Pagar: R$ {{ totalPrice.toFixed(2) }}</h3>
    <p v-else>Não há itens no carrinho.</p>
    <button v-if="cartProducts.length > 0" class="btn btn-primary" @click="finalizePurchase">
      Finalizar Compra ✔
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
  computed: {
    totalPrice() {
      return this.cartProducts.reduce((sum, product) => sum + product.preco * product.quantity, 0);
    }
  },
  methods: {
    async updateCart() {
      this.cartItems = cartstore.getCart();
      const productIds = Object.keys(this.cartItems);
      if (productIds.length > 0) {
        try {
          const response = await fetch(`http://localhost:4000/api/products/details?ids=${productIds.join(",")}`);
          const products = await response.json();
          this.cartProducts = products.map(product => ({
            ...product,
            quantity: this.cartItems[product.id],
          }));
        } catch (error) {
          console.error("Erro ao buscar produtos do carrinho:", error);
        }
      }
    },
    finalizePurchase() {
      alert("Compra realizada com sucesso! ✅");
      cartstore.cartItems = {};
      cartstore.saveCart();
      this.cartProducts = [];
      this.$router.push("/checkout/success");
    }
  },
  created() {
    this.updateCart();
  },
};
</script>
