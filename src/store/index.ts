import { createStore } from "vuex";
import { nFirestore } from "@/types/firestore";

import auth from "./modules/auth";
import popup from "./modules/popup";
import user from "./modules/user";
import people from "./modules/people";
import supplement from "./modules/supplement";
import food from "./modules/food";
import keypad from "@/store/modules/keypad";
import editor from "@/store/modules/editor";
import log from "@/store/modules/log";
import modal from './modules/modal';

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
    modal,
    user,
    people,
    supplement,
    food,
    keypad,
    editor,
    log
  }
});
