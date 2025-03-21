<template>
  <div class="success-container">
    <h1>🥳 Compra Finalizada com Sucesso!</h1>
    <p>O status do seu pedido foi atualizado para <strong>{{ orderStatus }}</strong>.</p>
    
    <div class="button-group">
      <router-link to="/product" class="btn btn-primary">🛍️ Continuar Comprando</router-link>
      <button class="btn btn-danger" @click="logout">🚪 Sair</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderStatus: "FINALIZADO", 
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userId");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.success-container {
  text-align: center;
  margin-top: 50px;
}

.button-group {
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.8;
}
</style>
