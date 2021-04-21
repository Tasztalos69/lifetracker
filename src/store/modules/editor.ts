import {
  DateSleepRow,
  FoodRow,
  NewFood,
  SupplementDrinkRow
} from "@/types/editor";
import { Food, Meal, Sleep } from "@/types/firestore";
import { ActionContext } from "vuex";
import { RootState } from "@/store";
import { DateTime } from "luxon";
import validateDB from "@/utils/validateDB";
import firebase from "firebase";
import DocumentData = firebase.firestore.DocumentData;
import precisionRound from "@/utils/precisionRound";
import isEmpty from "lodash/isEmpty";
import { PopupType } from "@/types/state";
import addZero from "@/utils/addZero";

interface S extends DateSleepRow, FoodRow, SupplementDrinkRow {
  dayId: string | undefined;
  dateStamp: string;
}

const validateTime = (value: string): boolean => {
  const timePattern = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
  return timePattern.test(value);
};

const inputDateToIsoString = (date: string): string => {
  return date.replaceAll(".", "-").replace(new RegExp("-" + "+$"), "");
};

const validateDate = (date: string): boolean => {
  const datePattern = /^(19|20)\d\d[.](0[1-9]|1[012])[.](0[1-9]|[12][0-9]|3[01])[.]$/;
  if (!datePattern.test(date)) return false;
  const dt = DateTime.fromISO(inputDateToIsoString(date));
  return dt.isValid;
};

const calcSleepTime = (start: string, end: string): string => {
  const refDate = DateTime.fromISO("2000-01-01T16:00");
  let startDate = DateTime.fromISO(`2000-01-01T${start}`);
  if (startDate < refDate) startDate = startDate.plus({ days: 1 });
  const endDate = DateTime.fromISO(`2000-01-02T${end}`);
  const diff = endDate.diff(startDate, ["hours", "minutes"]);
  return `${addZero(diff.hours)}:${addZero(diff.minutes)}`;
};

const saveToDB = async (state: S, rootState: RootState): Promise<void> => {
  const db = validateDB(rootState);
  const days = db.collection("days");

  console.log("saving to DB, dayId", state.dayId);

  // Exclude properties from firestore
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    dayId,
    newFood,
    newMeal,
    showNewMeal,
    ...stateCloneWithoutDayId
  } = state;
  /* eslint-enable */
  if (state.dayId) {
    await days.doc(state.dayId).set(stateCloneWithoutDayId);
  } else {
    const newDay = await days.add(stateCloneWithoutDayId);
    state.dayId = newDay.id;
  }
};

const state = (): S => ({
  dayId: undefined,
  date: "",
  dateStamp: "",
  sleep: {
    start: "",
    end: ""
  },
  newMeal: {
    time: "",
    foods: []
  },
  showNewMeal: false,
  newFood: [],
  meals: [],
  supplements: [],
  drink: 0
});

const getters = {
  date: (s: S): string => s.date,
  dateStamp: (s: S): string => s.dateStamp,
  sleep: (s: S): Sleep => s.sleep,
  newMeal: (s: S): Partial<Meal> => s.newMeal,
  showNewMeal: (s: S): boolean => s.showNewMeal,
  newFood: (s: S): NewFood[] => s.newFood,
  meals: (s: S): Meal[] => s.meals,
  supplements: (s: S): number[] => s.supplements,
  drink: (s: S): number => s.drink
};

const actions = {
  async save({
    state,
    rootGetters,
    rootState,
    commit,
    dispatch
  }: ActionContext<S, RootState>): Promise<any> {
    let value: string = rootGetters["keypad/value"];
    const field: string[] = rootGetters["keypad/ref"];

    console.log(value.length, rootGetters["keypad/maxLength"]);
    if (
      !field.includes("amount") &&
      value.length !== rootGetters["keypad/maxLength"]
    )
      return dispatch("keypad/setError", "Invalid format!", {
        root: true
      });

    let isValid: boolean;
    switch (field[0]) {
      case "newFood":
        isValid = true;
        break;
      case "newMeal":
      case "sleep":
        isValid = validateTime(value);
        break;
      case "date":
        isValid = validateDate(value);
        break;
      default:
        isValid = false;
        console.error("No matching ref processor found.");
        break;
    }
    if (!isValid)
      return dispatch("keypad/setError", "Invalid format!", {
        root: true
      });

    if (field[0] === "date") value = inputDateToIsoString(value);

    const stateClone: any = state;

    switch (field.length) {
      case 1:
        stateClone[field[0]] = value;
        break;
      case 2:
        stateClone[field[0]][field[1]] = value;
        break;
      case 3:
        if (field[0] === "newFood") {
          // Fuck Vuex array management
          stateClone[field[0]][field[1]] = {
            ...stateClone[field[0]][field[1]],
            amount: value
          };
          break;
        }
        stateClone[field[0]][field[1]][field[2]] = value;
        break;
      default:
        throw SyntaxError("Invalid ref!");
    }

    if (
      field[0] === "sleep" &&
      !isEmpty(stateClone.sleep.start) &&
      !isEmpty(stateClone.sleep.end)
    )
      stateClone.sleep.duration = calcSleepTime(
        stateClone.sleep.start,
        stateClone.sleep.end
      );

    if (field[0] !== "date") {
      await saveToDB(stateClone, rootState);
    }

    commit("replaceState", stateClone);

    if (field[0] === "date") await dispatch("fetchDayData");

    commit("keypad/discard", null, { root: true });
  },

  async setDate(
    { commit, state, dispatch }: ActionContext<S, RootState>,
    date: string
  ): Promise<void> {
    const stateClone: any = state;
    stateClone.date = date;
    stateClone.dateStamp = DateTime.fromISO(date).valueOf();
    commit("replaceState", stateClone);
    await dispatch("fetchDayData");
  },

  async fetchDayData({
    rootState,
    rootGetters,
    state,
    commit
  }: ActionContext<S, RootState>): Promise<void> {
    const db = validateDB(rootState);
    const date = state.date;
    try {
      const days = await db.collection("days");
      const currentDayQS = await days.where("date", "==", date).get();
      let currentDay: string | undefined;
      currentDayQS.forEach(d => (currentDay = d.id));
      commit("setDayId", currentDay);

      if (currentDay) {
        console.log("Day exists, loading data.");
        let currentDayData: DocumentData | undefined;
        currentDayQS.forEach(d => (currentDayData = d.data()));

        if (!currentDayData) return;
        commit("replaceStateWithObject", currentDayData);
      } else {
        console.log("entered date", date);

        commit("replaceStateWithObject", {
          dayId: undefined,
          date,
          dateStamp: DateTime.fromISO(state.date).valueOf(),
          sleep: {
            start: "",
            end: ""
          },
          newMeal: {},
          showNewMeal: false,
          newFood: [],
          meals: [],
          supplements: new Array(rootGetters["supplementTypes"].length).fill(0),
          drink: 0
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
  // Food row
  async confirmNewMeal({
    state,
    rootState,
    commit,
    dispatch
  }: ActionContext<S, RootState>): Promise<void> {
    if (isEmpty(state.newMeal.time))
      return dispatch(
        "addPopup",
        {
          text: "Please set the time for the new meal.",
          type: PopupType.ERROR
        },
        { root: true }
      );
    if (state.newFood.some(f => isEmpty(f.typeId) || f.amount === 0))
      return dispatch(
        "addPopup",
        {
          text: "Please choose a food type and make sure it has an amount.",
          type: PopupType.ERROR
        },
        { root: true }
      );
    const stateClone: S = state;
    stateClone.newFood.forEach(nf => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { selectedCategory, showDropdown, ...nfFiltered } = nf;
      stateClone.newMeal.foods?.push(<Food>nfFiltered);
    });
    stateClone.meals.push(<Meal>stateClone.newMeal);

    await saveToDB(stateClone, rootState);

    stateClone.showNewMeal = false;
    stateClone.newMeal = {};
    stateClone.newFood = [];

    commit("replaceState", stateClone);
  },
  // SupplementDrink row
  async changeSupplement(
    { commit, state, rootState }: ActionContext<S, RootState>,
    { id, prefix }: { id: number; prefix: number }
  ): Promise<void> {
    if (prefix !== 1 && prefix !== -1) throw Error("Invalid prefix");
    if (state.supplements[id] === 0 && prefix === -1) return;

    const newSupplement: number = state.supplements[id] + prefix;

    const newState = state;
    state.supplements[id] = newSupplement;

    await saveToDB(newState, rootState);

    commit("setSupplement", { id, newSupplement });
  },
  async changeWater(
    { state, commit, rootState }: ActionContext<S, RootState>,
    amount: number
  ): Promise<void> {
    const newValue = state.drink + amount;
    if (newValue < 0) return;

    const newState = state;
    state.drink = newValue;

    await saveToDB(newState, rootState);

    commit("setDrink", precisionRound(newValue, 1));
  },
  async removeNewFood(
    { commit }: ActionContext<S, RootState>,
    i: number
  ): Promise<void> {
    commit("keypad/discard", null, { root: true });
    commit("removeNewFood", i);
  }
};

const defaultNewFood = {
  amount: 0,
  typeId: "",
  showDropdown: false,
  selectedCategory: ""
};

const mutations = {
  replaceState(state: S, newState: S): void {
    console.log("replacing state with", newState);
    state = newState;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  replaceStateWithObject(s: any, newState: any): void {
    console.log("replaceStateWithObject", newState);
    s.date = newState.date;
    s.drink = newState.drink;
    s.meals = newState.meals;
    s.sleep = newState.sleep;
    s.supplements = newState.supplements;
  },
  setDayId(s: S, id: string | undefined): void {
    s.dayId = id;
  },
  // Food row
  toggleDropdown(s: S, i: number): void {
    s.newFood[i] = {
      ...s.newFood[i],
      showDropdown: !s.newFood[i].showDropdown
    };
  },
  toggleShowNewMeal(s: S): void {
    s.showNewMeal = !s.showNewMeal;
    s.newFood.push(defaultNewFood);
  },
  addNewFood(s: S): void {
    console.log(defaultNewFood);
    s.newFood.push(defaultNewFood);
  },
  removeNewFood(s: S, i: number): void {
    if (s.newFood.length === 1) s.showNewMeal = false;
    s.newFood.splice(i, 1);
  },
  setSelectedCategory(s: S, { id, i }: { id: string; i: number }): void {
    s.newFood[i] = { ...s.newFood[i], selectedCategory: id };
  },
  setSelectedType(s: S, { id, i }: { id: string; i: number }): void {
    s.newFood[i] = {
      ...defaultNewFood,
      typeId: id,
      selectedCategory: "",
      showDropdown: false
    };
  },
  // SupplementDrink row

  setSupplement(
    s: S,
    { id, newSupplement }: { id: number; newSupplement: number }
  ): void {
    console.log("setting supplement to", newSupplement);
    s.supplements[id] = newSupplement;
  },
  setDrink(s: S, newValue: number): void {
    s.drink = newValue;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
