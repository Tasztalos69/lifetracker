import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyLsrEif1fNfDVRObWOzB2KoyTCAfvR4Q",
  authDomain: "lifetracker-7a3e9.firebaseapp.com",
  projectId: "lifetracker-7a3e9",
  storageBucket: "lifetracker-7a3e9.appspot.com",
  messagingSenderId: "383638427361",
  appId: "1:383638427361:web:774af0aac7cc0fae3dc9a0"
};

firebase.initializeApp(firebaseConfig);

import FontAwesomeIconWithLibrary from "./libs/fontawesome";

createApp(App)
  .use(store)
  .use(router)
  .component("fa", FontAwesomeIconWithLibrary)
  .mount("#app");
