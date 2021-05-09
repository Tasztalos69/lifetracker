import {
  CompoundLogData,
  LogState as S,
  PopupType,
  TypedDay,
  TypedMilestone,
} from '@/types/state';
import { Day, Milestone, Nullable } from '@/types/firestore';
import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import validateDB from '@/utils/validateDB';
import firebase from 'firebase';
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import constructFBData from '@/utils/constructFBData';
import numOrZero from '@/utils/numOrZero';

const state = (): S => ({
  days: [],
  milestones: [],
  lastVisible: null,
  isListEnd: false,
});

const getters = {
  days: (s: S): Day[] => s.days,
  milestones: (s: S): Milestone[] => s.milestones,
  lastVisible: (s: S): Nullable<QueryDocumentSnapshot> => s.lastVisible,
  isListEnd: (s: S): boolean => s.isListEnd,
  compound: (s: S): CompoundLogData[] => {
    const days: TypedDay[] = s.days as TypedDay[];
    const milestones: TypedMilestone[] = s.milestones as TypedMilestone[];
    days.forEach(d => (d.type = 'day'));
    milestones.forEach(m => (m.type = 'milestone'));
    return [...days, ...milestones].sort(
      (a, b) => numOrZero(a.dateStamp) - numOrZero(b.dateStamp),
    );
  },
};

interface Range {
  start: string;
  end: string;
}

interface NewMst {
  title: string;
  dateStamp: number;
}

const actions = {
  async fetchDays(
    { state, rootState, commit, dispatch }: ActionContext<S, RootState>,
    shouldReset = false,
  ): Promise<void> {
    if (shouldReset) {
      commit('setListEnd', false);
      commit('purgeDays');
    }

    const db = validateDB(rootState);
    const daysQuery = await db
      .collection('days')
      .limit(30)
      .orderBy('dateStamp')
      .startAfter(shouldReset ? 0 : state.lastVisible || 0);
    const days = await daysQuery.get();

    if (!state.isListEnd && days.docs.length > 0) {
      commit('setLastVisible', days.docs[days.docs.length - 1]);
      days.forEach(d => commit('appendDay', constructFBData(d)));

      const sortedDays = state.days.sort(
        (a, b) => numOrZero(a.dateStamp) - numOrZero(b.dateStamp),
      );
      await dispatch('fetchMilestones', {
        start: sortedDays[0].dateStamp,
        end: sortedDays[sortedDays.length - 1].dateStamp,
      });
    } else {
      commit('setListEnd', true);
    }
  },

  async fetchRangeDays(
    { rootState, commit, dispatch }: ActionContext<S, RootState>,
    { start, end }: Range,
  ): Promise<void> {
    const db = validateDB(rootState);
    commit('purgeDays');
    const days = await db
      .collection('days')
      .where('dateStamp', '>=', start)
      .where('dateStamp', '<=', end)
      .get();
    days.forEach(d => commit('appendDay', constructFBData(d)));
    await dispatch('fetchMilestones', { start, end });
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

  async addMilestone(
    { state, rootState, dispatch, commit }: ActionContext<S, RootState>,
    { title, dateStamp }: NewMst,
  ): Promise<void> {
    const db = validateDB(rootState);
    console.log('dateStamp', dateStamp);
    await db.collection('milestones').add({ title, dateStamp });
    commit('purgeMilestones');

    // TODO fetch for new milestones

    await dispatch(
      'addPopup',
      { text: 'Success.', type: PopupType.INFO },
      { root: true },
    );
  },

  async fetchMilestones(
    { rootState, commit }: ActionContext<S, RootState>,
    { start, end }: Range,
  ): Promise<void> {
    const db = validateDB(rootState);
    commit('purgeMilestones');
    const msts = await db
      .collection('milestones')
      .where('dateStamp', '>=', start)
      .where('dateStamp', '<=', end)
      .get();
    msts.forEach(d => commit('appendMilestone', constructFBData(d)));
  },

  async deleteMilestone(
    { commit, rootState }: ActionContext<string, RootState>,
    id: string,
  ): Promise<void> {
    const db = validateDB(rootState);
    try {
      await db
        .collection('milestones')
        .doc(id)
        .delete();

      commit('filterMilestones', id);
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

  appendMilestone(s: S, m: Milestone): void {
    s.milestones.push(m);
  },
  purgeMilestones(s: S): void {
    s.milestones = [];
  },
  filterMilestones(s: S, id: string): void {
    s.milestones = s.milestones.filter(d => d.id !== id);
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
