import { ModalState as S } from '@/types/state';
import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import {
  removeReloadPrevention,
  setReloadPrevention,
} from '@/utils/preventReload';

/* eslint-disable @typescript-eslint/no-empty-function */
const defaultState = {
  title: '',
  description: '',
  okBtn: '',
  closeBtn: '',
  callback: () => {},
};
const state = (): S => ({
  ...defaultState,
});
/* eslint-enable */

const getters = {
  modal: (s: S): S => s,
};

const actions = {
  async setModal(
    { commit }: ActionContext<S, RootState>,
    modal: S,
  ): Promise<void> {
    const { title, description, okBtn, closeBtn, callback } = modal;
    if (!title || !okBtn || !closeBtn || !callback) {
      console.log('Provided parameters:', {
        title,
        okBtn,
        closeBtn,
        callback,
        description,
      });
      throw ReferenceError('Invalid arguments for setModal!');
    }
    commit('setModal', modal);
    setReloadPrevention();
  },
  async modalBtnHandler(
    { commit, state }: ActionContext<S, RootState>,
    isOk = false,
  ): Promise<void> {
    if (isOk) {
      await state.callback();
    }
    removeReloadPrevention();
    commit('setModal', { ...defaultState });
  },
};
const mutations = {
  setModal(s: S, modal: S): void {
    s.title = modal.title;
    s.description = modal.description;
    s.okBtn = modal.okBtn;
    s.closeBtn = modal.closeBtn;
    s.callback = modal.callback;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
