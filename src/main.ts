import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Amplify from "aws-amplify";

import aws_exports from "./aws-exports.js";
Amplify.configure(aws_exports);

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
