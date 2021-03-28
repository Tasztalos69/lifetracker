import { createStore } from "vuex";

import auth from "./modules/auth";
import popup from "./modules/popup";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    popup
  }
});
