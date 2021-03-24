import { Auth } from "aws-amplify";
import {
  CognitoHostedUIIdentityProvider,
  CognitoUser
} from "@aws-amplify/auth";
import { Commit } from "vuex";

type User = CognitoUser | null;

interface AccountState {
  loading: boolean;
  authorized: boolean;
  user: User;
  loginError: string;
}

const state = (): AccountState => ({
  loading: true,
  authorized: false,
  user: null,
  loginError: ""
});

const getters = {
  isLoggedIn: (state: AccountState): boolean => state.authorized,
  user: (state: AccountState): User => state.user
};

const actions = {
  async load({ commit }: { commit: Commit }): Promise<boolean> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      commit("set", user);
      return user;
    } catch (e) {
      commit("set", null);
      return false;
    }
  },

  async loginWithGoogle({ commit }: { commit: Commit }): Promise<void> {
    const user = await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    });
    commit("set", user);
    // return user;
  }
};

const mutations = {
  set(state: AccountState, user: CognitoUser): void {
    state.user = user;
    state.authorized = !!user;
    state.loading = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
