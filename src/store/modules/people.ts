import { ActionContext } from "vuex";
import { RootState } from "../index";
import validateDB from "../../utils/validateDB";
import { PeopleState as S } from "../../types/state";
import { Person } from "../../types/firestore";

const state = (): S => ({
  availablePeople: []
});
const getters = {
  availablePeople: (state: S): Person[] => state.availablePeople
};
const actions = {
  async getAvailablePeople({
    rootState,
    rootGetters,
    commit
  }: ActionContext<S, RootState>): Promise<void> {
    commit("clearList");
    const db = validateDB(rootState);
    const selectedPersonID = await rootGetters["selectedPersonID"];
    console.log(selectedPersonID);
    const people = await db.collection("people").get();
    people.forEach(
      doc =>
        doc.id !== selectedPersonID &&
        commit("addToList", { ...doc.data(), id: doc.id })
    );
  }
};
const mutations = {
  addToList(state: S, toAdd: Person): void {
    state.availablePeople.push(toAdd);
  },
  clearList(state: S): void {
    state.availablePeople = [];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
