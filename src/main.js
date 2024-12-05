import { registerPlugins } from './plugins/index.js'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
axios.interceptors.request.use((config) => {
  if (
    !config.url.startsWith('/auth')
    && config.url !== "/professor/all"
  ) {
        config.headers['Authorization'] = `Bearer ${
      localStorage.getItem("apiToken")
        .replace(/"/g, '')
    }`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("apiToken")
      localStorage.removeItem("role")
      localStorage.removeItem("userId")

      router.push('/login')
    }
    return Promise.reject(error)
  }
)

import App from './App.vue'

import { createApp } from 'vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import router from "./router/index.js";

const app = createApp(App)

registerPlugins(app)

app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
