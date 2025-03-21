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
          <td>{{ product.quantidade }}</td>
          <td>{{ formatCurrency(product.preco) }}</td>
          <td>{{ formatCurrency(product.preco * product.quantidade) }}</td>
        </tr>
      </tbody>
    </table>

    <h3 v-if="cartProducts.length > 0">Total a Pagar: {{ formatCurrency(totalPrice) }}</h3>
    <p v-else>Não há itens no carrinho.</p>

    <button v-if="cartProducts.length > 0" class="btn btn-primary" @click="finalizePurchase">
      Finalizar Compra ✔
    </button>

    <p v-if="paymentStatus"
      :class="{ 'text-success': paymentStatus === 'CONCLUIDO', 'text-danger': paymentStatus === 'FALHOU' }">
      Status do Pagamento: {{ paymentStatus }}
    </p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const cartProducts = ref([]);
    const paymentStatus = ref("");
    const orderId = ref(null);

    const totalPrice = computed(() => {
      return cartProducts.value.reduce((sum, product) => sum + product.preco * product.quantidade, 0);
    });

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    };

    const updateCart = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("⚠️ Usuário não autenticado.");
          return;
        }

        const response = await fetch(`http://localhost:4000/api/cart/${userId}`);
        if (!response.ok) throw new Error("Erro ao buscar carrinho");

        const data = await response.json();

        cartProducts.value = data.itens
          ? data.itens
            .filter(item => item.produto) 
            .map((item) => ({
              id: item.produto?.id || null, 
              nome: item.produto?.nome || "Produto não identificado",
              preco: parseFloat(item.produto?.preco) || 0,
              quantidade: item.quantidade || 1,
            }))
          : [];
      } catch (error) {
        console.error("❌ Erro ao buscar produtos do carrinho:", error);
        cartProducts.value = [];
      }
    };

    const finalizePurchase = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("⚠️ Usuário não autenticado.");
          return;
        }

        await updateCart();

        if (!Array.isArray(cartProducts.value) || cartProducts.value.length === 0) {
          alert("Carrinho vazio. Adicione itens antes de finalizar a compra.");
          return;
        }

        const valorTotal = cartProducts.value.reduce(
          (sum, product) => sum + Number(product.preco) * product.quantidade,
          0
        );

        const orderResponse = await fetch("http://localhost:4000/api/order/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, valorTotal }),
        });

        if (!orderResponse.ok) {
          throw new Error("Erro ao criar pedido. Verifique o backend.");
        }

        const orderData = await orderResponse.json();

        if (!orderData.orderId) {
          throw new Error("Resposta inválida do servidor. Faltando orderId.");
        }

        alert("Pedido criado com sucesso!");
        window.location.href = "http://localhost:3000/checkout/success";
      } catch (error) {
        console.error("Erro ao finalizar compra:", error);
        alert("Erro ao processar pagamento.");
      }
    };

    onMounted(async () => {
      await updateCart();
    });

    return { cartProducts, totalPrice, finalizePurchase, paymentStatus, formatCurrency };
  },
};
</script>
