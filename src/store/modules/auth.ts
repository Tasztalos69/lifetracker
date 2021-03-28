import { ActionContext } from "vuex";
import firebase from "firebase/app";
import User = firebase.User;
import router from "../../router";
import { Routes } from "../../types/router";
import { AuthState as S, PopupType } from "../../types/state";
import { RootState } from "../index";

const state = (): S => ({
  authorized: false,
  user: null,
  isContentManager: false
});

const getters = {
  user: (state: S): User | null => state.user,
  UID: (state: S): string => state.user?.uid || "",
  isLoggedIn: (state: S): boolean => state.authorized,
  isContentManager: (state: S): boolean => state.isContentManager
};

const actions = {
  async setUser(
    { commit, dispatch }: ActionContext<S, RootState>,
    { user }: { user: User | null }
  ): Promise<void> {
    if (!user) return commit("set", null);
    const idTokenResult = await user.getIdTokenResult();
    const claims = idTokenResult.claims;

    if (!claims.observer) {
      await firebase.auth().signOut();
      await commit(
        "addNew",
        {
          text: "Sorry, you are not allowed to enter.",
          type: PopupType.ERROR
        },
        { root: true }
      );
      return commit("set", null);
    }

    commit("set", user);
    await dispatch("fetch", null, { root: true });
    if (router.currentRoute.value.name === Routes.Login && user)
      await router.push({ name: Routes.Dashboard });
    if (claims.contentManager) {
      commit("setContentManager", true);
    }
  },

  async logOut({ commit }: ActionContext<S, RootState>): Promise<void> {
    console.log("logging out...");
    await firebase.auth().signOut();
    commit("set", null);
    commit("setContentManager", false);
    await router.push({ name: Routes.Login });
  }
};

const mutations = {
  set(state: S, user: User): void {
    state.user = user;
    state.authorized = !!user;
  },
  setContentManager(state: S, isContentManager: boolean): void {
    state.isContentManager = isContentManager;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
