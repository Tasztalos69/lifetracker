import { Auth } from "aws-amplify";
import {
  CognitoHostedUIIdentityProvider,
  CognitoUser
} from "@aws-amplify/auth";
import { Commit } from "vuex";

type User = CognitoUser | null;

interface AccountState {
  authorized: boolean;
  user: User;
  isContentManager: boolean;
}

const state = (): AccountState => ({
  authorized: false,
  user: null,
  isContentManager: false
});

const getters = {
  user: (state: AccountState): User => state.user,
  isLoggedIn: (state: AccountState): boolean => state.authorized,
  isContentManager: (state: AccountState): boolean => state.isContentManager
};

const actions = {
  async load({ commit }: { commit: Commit }): Promise<boolean> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const groups: string[] = user.getSignInUserSession().getAccessToken()
        .payload["cognito:groups"];

      if (!groups.includes("observers")) {
        await this.logOut({ commit }); // To be tested
        return false;
      }

      if (groups.includes("contentManagers")) {
        commit("setContentManager", true);
      }

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
  },

  async logOut({ commit }: { commit: Commit }): Promise<void> {
    await Auth.signOut();
    commit("set", null);
  }
};

const mutations = {
  set(state: AccountState, user: CognitoUser): void {
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
