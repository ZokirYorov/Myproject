import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './style.css';
import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';
import  router from './router';
import { createPinia} from "pinia";
import App from './App.vue';

const pinia = createPinia()

  createApp(App)
     .use(router)
      .use(Toast)
     .use(ElementPlus)
      .use(pinia)
     .mount('#app')
