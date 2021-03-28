import { ColorSchemes, UserSettings as S } from "../../types/firestore";
import { ActionContext } from "vuex";
import { RootState } from "../index";
import router from "../../router";
import { Routes } from "../../types/router";

const state = (): S => ({
  selectedPerson: null,
  colorScheme: ColorSchemes.DEFAULT
});
const getters = {
  selectedPerson: (state: S): string | null => state.selectedPerson
};
const actions = {
  async fetch({
    rootState,
    rootGetters
  }: ActionContext<S, RootState>): Promise<void> {
    const { db } = rootState;
    if (!db) return;

    const UID = await rootGetters["auth/UID"];

    const users = await db.collection("users");

    const currentUser = await users.doc(UID).get();

    if (!currentUser.exists) {
      await router.push({ name: Routes.People });
    }
  }
};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
