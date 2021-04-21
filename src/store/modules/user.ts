import {
  ColorSchemes,
  UserSettings,
  UserSettings as S
} from "@/types/firestore";
import { ActionContext } from "vuex";
import { RootState } from "@/store";
import router from "@/router";
import { Routes } from "@/types/router";
import validateDB from "@/utils/validateDB";

const state = (): S => ({
  selectedPerson: null,
  colorScheme: ColorSchemes.DEFAULT
});
const getters = {
  selectedPersonID: (state: S): string | null => state.selectedPerson
};
const actions = {
  async fetch({
    commit,
    rootState,
    rootGetters
  }: ActionContext<S, RootState>): Promise<void> {
    const db = validateDB(rootState);

    const UID = await rootGetters["auth/UID"];

    const users = await db.collection("users");

    const currentUser = await users.doc(UID).get();

    if (currentUser.exists) {
      commit("selectedPerson", currentUser.data()?.selectedPerson);
    } else {
      await router.push({ name: Routes.People });
    }
  },
  async setSelectedPerson(
    { commit, rootState, rootGetters, dispatch }: ActionContext<S, RootState>,
    personID: string
  ): Promise<void> {
    const db = validateDB(rootState);

    const UID = await rootGetters["auth/UID"];

    const users = await db.collection("users");

    const newPrefs: UserSettings = {
      selectedPerson: personID,
      colorScheme: ColorSchemes.DEFAULT
    };

    await users.doc(UID).set(newPrefs);

    await commit("selectedPerson", personID);
    await dispatch("getAvailablePeople");
  }
};
const mutations = {
  selectedPerson(state: S, newPerson: string): void {
    state.selectedPerson = newPerson;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
