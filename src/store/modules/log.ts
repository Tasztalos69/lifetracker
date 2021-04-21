import { LogState as S } from "@/types/state";
import { Day, Nullable } from "@/types/firestore";
import { ActionContext } from "vuex";
import { RootState } from "@/store";
import validateDB from "@/utils/validateDB";
import firebase from "firebase";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import constructFBData from "@/utils/constructFBData";

const state = (): S => ({ days: [], lastVisible: null });

const getters = {
  days: (s: S): Day[] => s.days,
  lastVisible: (s: S): Nullable<QueryDocumentSnapshot> => s.lastVisible
};

const actions = {
  async fetchDays({
    state,
    rootState,
    commit
  }: ActionContext<S, RootState>): Promise<void> {
    const db = validateDB(rootState);
    const daysQuery = await db
      .collection("days")
      .where("date", "!=", "")
      .orderBy("date")
      .limit(30);
    if (state.lastVisible) {
      daysQuery.startAfter(state.lastVisible);
    }
    const days = await daysQuery.get();
    commit("setLastVisible", days.docs[days.docs.length - 1]);
    days.forEach(d => commit("appendDay", constructFBData(d)));
  },
  async fetchRangeDays(
    { rootState }: ActionContext<S, RootState>,
    { rangeStart, rangeEnd }: { rangeStart: string; rangeEnd: string }
  ): Promise<void> {
    const db = validateDB(rootState);
  }
};

const mutations = {
  appendDay(s: S, data: Day): void {
    s.days.push(data);
  },
  purgeDays(s: S): void {
    s.days = [];
  },
  setLastVisible(s: S, data: QueryDocumentSnapshot): void {
    s.lastVisible = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
