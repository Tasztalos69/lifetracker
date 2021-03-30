import { SupplementState as S } from "@/types/state";
import { ActionContext } from "vuex";
import { RootState } from "@/store";
import { SupplementType } from "@/types/firestore";
import validateDB from "@/utils/validateDB";
import constructFBData from "@/utils/constructFBData";

const state = (): S => ({
  supplementTypes: []
});
const getters = {
  supplementTypes: (state: S): SupplementType[] => state.supplementTypes
};
const actions = {
  async fetchSupplementTypes({
    commit,
    rootState
  }: ActionContext<S, RootState>): Promise<void> {
    const db = validateDB(rootState);
    const supplementTypes = await db.collection("supplementTypes").get();
    supplementTypes.forEach(doc => commit("add", constructFBData(doc)));
    return;
  }
};
const mutations = {
  add(state: S, supplementType: SupplementType): void {
    state.supplementTypes.push(supplementType);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
