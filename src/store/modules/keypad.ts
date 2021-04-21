import { KeypadState as S } from "@/types/state";
import { ActionContext } from "vuex";
import { RootState } from "@/store";

const state = (): S => ({
  ref: [],
  value: "",
  maxLength: 0,
  delimiter: null,
  delimiterCount: 0,
  placeholder: ""
});

const getters = {
  all: (state: S): S => state,
  ref: (state: S): string[] => state.ref,
  value: (state: S): string => state.value,
  maxLength: (state: S): number => state.maxLength
};
const actions = {
  setError({ commit }: ActionContext<S, RootState>, text: string): void {
    commit("setError", text);
    setTimeout(() => {
      commit("setError", undefined);
    }, 2000);
  }
};

const beforeUnloadListener = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = "";
};

const mutations = {
  init(
    state: S,
    { placeholder, delimiter, delimiterCount, ref, value, maxLength }: S
  ): void {
    if (
      !placeholder ||
      (!delimiterCount && delimiterCount !== 0) ||
      !ref ||
      !maxLength
    ) {
      console.log("Provided parameters:", {
        delimiter,
        delimiterCount,
        ref,
        value,
        maxLength
      });
      throw ReferenceError("Invalid parameters for keypad init!");
    }
    if (ref.toString() === state.ref.toString()) {
      state.ref = [];
      state.value = "";
      state.delimiter = null;
      state.placeholder = "";
      window.removeEventListener("beforeunload", beforeUnloadListener);
      return;
    }

    state.ref = ref;
    state.placeholder = placeholder;
    state.delimiter = delimiter;
    state.delimiterCount = delimiterCount;
    state.value = value || "";
    state.maxLength = maxLength;

    window.addEventListener("beforeunload", beforeUnloadListener);
  },
  add(state: S, charToAppend: string): void {
    state.value = state.value.concat(charToAppend);
  },
  discard(state: S): void {
    state.ref = [];
    state.value = "";
    state.delimiter = null;
    state.placeholder = "";
    window.removeEventListener("beforeunload", beforeUnloadListener);
  },
  setError(state: S, text?: string): void {
    state.error = text;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
