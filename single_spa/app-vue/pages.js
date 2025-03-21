import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import singleSpaVue from "single-spa-vue"

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(App),
    router,
    el: "#app-vue"
  },
  handleInstance: (app) => {
    app.use(router);  
  }
});

export const { bootstrap, mount, unmount } = vueLifecycles;
