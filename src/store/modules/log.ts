import { LogState as S } from '@/types/state';
import { Day, Nullable } from '@/types/firestore';
import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import validateDB from '@/utils/validateDB';
import firebase from 'firebase';
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import constructFBData from '@/utils/constructFBData';

const state = (): S => ({ days: [], lastVisible: null, isListEnd: false });

const getters = {
  days: (s: S): Day[] => s.days,
  lastVisible: (s: S): Nullable<QueryDocumentSnapshot> => s.lastVisible,
  isListEnd: (s: S): boolean => s.isListEnd,
};

const actions = {
  async fetchDays(
    { state, rootState, commit }: ActionContext<S, RootState>,
    shouldReset = false,
  ): Promise<void> {
    if (shouldReset) {
      commit('setListEnd', false);
      commit('purgeDays');
    }

    const db = validateDB(rootState);
    const daysQuery = await db
      .collection('days')
      .orderBy('dateStamp')
      .limit(30)
      .startAfter(shouldReset ? 0 : state.lastVisible || 0);
    const days = await daysQuery.get();
    console.log('days', days);

    if (!state.isListEnd && days.docs.length > 0) {
      commit('setLastVisible', days.docs[days.docs.length - 1]);
      days.forEach(d => commit('appendDay', constructFBData(d)));
    } else {
      commit('setListEnd', true);
    }
  },
  async fetchRangeDays(
    { rootState, commit }: ActionContext<S, RootState>,
    { start, end }: { start: string; end: string },
  ): Promise<void> {
    const db = validateDB(rootState);
    commit('purgeDays');
    const days = await db
      .collection('days')
      .where('dateStamp', '>=', start)
      .where('dateStamp', '<=', end)
      .orderBy('dateStamp')
      .get();
    days.forEach(d => commit('appendDay', constructFBData(d)));
  },
  async deleteDay(
    { commit, rootState }: ActionContext<string, RootState>,
    id: string,
  ): Promise<void> {
    const db = validateDB(rootState);
    try {
      await db
        .collection('days')
        .doc(id)
        .delete();

      commit('filterDays', id);
    } catch (e) {
      console.error(e);
    }
  },
};

const mutations = {
  appendDay(s: S, data: Day): void {
    s.days.push(data);
  },
  filterDays(s: S, id: string): void {
    s.days = s.days.filter(d => d.id !== id);
  },
  purgeDays(s: S): void {
    s.days = [];
  },
  setLastVisible(s: S, data: QueryDocumentSnapshot): void {
    s.lastVisible = data;
  },
  setListEnd(s: S, isListEnd: boolean): void {
    s.isListEnd = isListEnd;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
