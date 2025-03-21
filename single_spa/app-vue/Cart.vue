<template>
  <div>
    <h1>🛒 Carrinho de Compras</h1>
    <a href="/product">← Voltar para Lista</a>

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
        <tr v-for="item in cartProducts" :key="item.id">
          <td>{{ item.nome || 'Produto Desconhecido' }}</td>
          <td>{{ item.quantidade || 0 }}</td>
          <td>{{ formatCurrency(item.preco) }}</td>
          <td>{{ formatCurrency((item.preco || 0) * (item.quantidade || 0)) }}</td>
          <td>
            <button class="btn btn-danger" @click="removeItem(item.id)">🗑️</button>
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
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { cartstore } from "../cartstore";

export default {
  setup() {
    const cartProducts = ref([]);
    const router = useRouter();

    onMounted(async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await cartstore.init(userId);
      }
    });

    watchEffect(() => {
      cartProducts.value = cartstore.cartItems.map(item => ({
        id: item.produto?.id || item.Produtos_id || null,
        nome: item.produto?.nome || "Produto Desconhecido",
        preco: parseFloat(item.produto?.preco) || 0,
        quantidade: item.quantidade || 1,
      }));
    });

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    };

    const removeItem = async (produtoId) => {
      await cartstore.removeFromCart(produtoId);
    };

    const goToPay = () => {
      router.push("/checkout/pay");
    };

    return { cartProducts, removeItem, goToPay, formatCurrency };
  },
};
</script>
