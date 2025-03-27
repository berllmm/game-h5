import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// Import our custom CSS
import "./scss/styles.scss";
import router from "./routers/index";

import {
  message,
  Table,
  InputNumber,
  Form,
  Input,
  Select,
  Radio,
  Upload,
  Spin,
  Progress,
  Tooltip
} from "ant-design-vue";

import VueCookie from 'vue-cookie'
import vue3GoogleLogin from 'vue3-google-login'
import { createPinia } from 'pinia';

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
const app = createApp(App);
const pinia = createPinia();
import * as buffer from 'buffer'

if (typeof window.Buffer === 'undefined') {
  window.Buffer = buffer.Buffer
}

app.config.globalProperties.$cookis = VueCookie

app.config.globalProperties.$message = message;

app.use(router);

app.use(Table);
app.use(InputNumber);
app.use(Form);
app.use(Input);
app.use(Select);
app.use(Radio);
app.use(Upload);
app.use(Spin);
app.use(Tooltip);
app.use(Progress);
app.use(pinia);
app.use(vue3GoogleLogin, {
  clientId: '753235075367-ojfpmgrnold60alog8r8bfapt21k2aut.apps.googleusercontent.com'
})

app.mount("#app");
