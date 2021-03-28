import { Popup, PopupState as S } from "../../types/state";
import { ActionContext } from "vuex";
import { RootState } from "../index";

const state = (): S => ({
  popups: []
});

const getters = {
  currentPopup: (state: S): Popup => state.popups[0],
  allPopups: (state: S): Popup[] => state.popups
};

const actions = {
  async addPopup(
    { commit }: ActionContext<S, RootState>,
    newPopup: Popup
  ): Promise<void> {
    await commit("addNew", newPopup);
  },

  clearFirstPopup({ commit }: ActionContext<S, RootState>): void {
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
