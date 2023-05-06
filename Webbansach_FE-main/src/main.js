import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
.use(router).use(store)
.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
  }).mount('#app')
