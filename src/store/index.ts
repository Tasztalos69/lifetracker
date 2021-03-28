import { createStore } from "vuex";

import auth from "./modules/auth";
import popup from "./modules/popup";
import user from "./modules/user";
import { nFirestore } from "../types/firestore";
import people from "./modules/people";

export interface RootState {
  db: nFirestore;
}

export default createStore({
  getters: {
    db: (state: RootState): nFirestore => state.db
  },
  state: {
    db: null
  },
  mutations: {
    setDB(state: RootState, value: nFirestore) {
      state.db = value;
    }
  },
  actions: {},
  modules: {
    auth,
    popup,
    user,
    people
  }
});
