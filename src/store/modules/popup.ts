import { Popup, PopupState as S, PopupType } from "../../types/state";
import { Commit } from "vuex";

const state = (): S => ({
  popups: []
});

const getters = {
  currentPopup: (state: S): Popup => state.popups[0],
  allPopups: (state: S): Popup[] => state.popups
};

const actions = {
  async addPopup(
    { commit }: { commit: Commit },
    newPopup: Popup
  ): Promise<void> {
    await commit("addNew", newPopup);
  },

  clearFirstPopup({ commit }: { commit: Commit }): void {
    commit("clearFirst");
  }
};

const mutations = {
  addNew(state: S, popup: Popup): void {
    console.log("mutating state with popup", popup);
    state.popups.push(popup);
  },
  clearFirst(state: S): void {
    state.popups.shift();
  },
  clearAll(state: S): void {
    state.popups = [];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
