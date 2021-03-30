import { ActionContext } from "vuex";
import { RootState } from "../index";
import validateDB from "../../utils/validateDB";
import { PeopleState as S } from "../../types/state";
import { Nullable, Person } from "../../types/firestore";
import constructFBData from "@/utils/constructFBData";

const state = (): S => ({
  availablePeople: [],
  selectedPersonData: null
});
const getters = {
  selectedPersonData: (state: S): Nullable<Person> => state.selectedPersonData,
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
    people.forEach(doc =>
      doc.id === selectedPersonID
        ? commit("setSelectedData", constructFBData(doc))
        : commit("addToList", constructFBData(doc))
    );
  }
};
const mutations = {
  setSelectedData(state: S, toAdd: Person): void {
    state.selectedPersonData = toAdd;
    console.log("setting selected person", toAdd);
  },
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
