import { createRouter, createWebHistory } from "vue-router";
import Cart from "./Cart.vue";
import Pay from "./Pay.vue";
import Success from "./Success.vue";

const routes = [
  { path: "/checkout/cart", component: Cart },
  { path: "/checkout/pay", component: Pay },
  { path: "/checkout/success", component: Success },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
