import { Commit } from "vuex";
import firebase from "firebase/app";
import User = firebase.User;
import router from "../../router";
import { Routes } from "../../types/router";

interface AccountState {
  authorized: boolean;
  user: User | null;
  isContentManager: boolean;
}

const state = (): AccountState => ({
  authorized: false,
  user: null,
  isContentManager: false
});

const getters = {
  isLoggedIn: (state: AccountState): boolean => state.authorized,
  isContentManager: (state: AccountState): boolean => state.isContentManager
};

interface SetUserProps {
  user: User | null;
  isObserver: boolean;
  isContentManager: boolean;
}

const actions = {
  async setUser(
    { commit }: { commit: Commit },
    { user }: SetUserProps
  ): Promise<void> {
    if (!user) return commit("set", null);
    const idTokenResult = await user.getIdTokenResult();
    const claims = idTokenResult.claims;
    console.log(claims);
    if (!claims.observer) {
      await firebase.auth().signOut();
      return commit("set", null);
    }
    commit("set", user);
    if (router.currentRoute.value.name === Routes.Login && user)
      await router.push({ name: Routes.Dashboard });
    if (claims.contentManager) {
      commit("setContentManager", true);
    }
  },

  async logOut({ commit }: { commit: Commit }): Promise<void> {
    console.log("logging out...");
    await firebase.auth().signOut();
    commit("set", null);
    commit("setContentManager", false);
    await router.push({ name: Routes.Login });
  }
};

const mutations = {
  set(state: AccountState, user: User): void {
    state.user = user;
    state.authorized = !!user;
  },
  setContentManager(state: AccountState, isContentManager: boolean): void {
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
