import { createStore } from "vuex";
import { nFirestore } from "@/types/firestore";

import auth from "./modules/auth";
import popup from "./modules/popup";
import user from "./modules/user";
import people from "./modules/people";
import supplement from "./modules/supplement";

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
    people,
    supplement,
  }
});
