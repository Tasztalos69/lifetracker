import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Amplify from "aws-amplify";

import aws_exports from "./aws-exports.js";
Amplify.configure(aws_exports);

import FontAwesomeIconWithLibrary from "./libs/fontawesome";

createApp(App)
  .use(store)
  .use(router)
  .component("fa", FontAwesomeIconWithLibrary)
  .mount("#app");
