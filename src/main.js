import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Typewriter from "typewriter-vue";

createApp(App).use(store).use(router).mount("#app");
App.use(Typewriter);
