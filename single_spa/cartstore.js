export const cartstore = {
  currentUserId: null,
  cartItems: {},

  init(userId) {
    this.currentUserId = userId;
    this.cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || {};
  },

  getCart() {
    return this.cartItems;
  },

  addToCart(id) {
    this.cartItems[id] = (this.cartItems[id] || 0) + 1;
    this.saveCart();
  },

  removeFromCart(id) {
    if (this.cartItems[id]) {
      delete this.cartItems[id];
      this.saveCart();
    }
  },

  clearCart() {
    this.cartItems = {};
    localStorage.removeItem(`cart_${this.currentUserId}`);
    window.dispatchEvent(new Event("cart-updated"));
  },

  saveCart() {
    localStorage.setItem(`cart_${this.currentUserId}`, JSON.stringify(this.cartItems));
    window.dispatchEvent(new Event("cart-updated"));
  },
};
