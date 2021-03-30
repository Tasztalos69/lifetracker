import { FoodState as S } from "@/types/state";
import { FoodCategory, FoodType } from "@/types/firestore";
import { ActionContext } from "vuex";
import { RootState } from "@/store";
import validateDB from "@/utils/validateDB";
import constructFBData from "@/utils/constructFBData";

const state = (): S => ({
  foodCategories: [],
  foodTypes: []
});
const getters = {
  foodCategories: (state: S): FoodCategory[] => state.foodCategories,
  foodTypes: (state: S) => (id: string): FoodType[] =>
    state.foodTypes.filter(t => t.categoryId === id),
  foodType: (state: S) => (id: string): FoodType =>
    state.foodTypes.filter(t => t.id === id)[0]
};
const actions = {
  async fetchFoodCategoriesAndTypes({
    rootState,
    commit
  }: ActionContext<S, RootState>): Promise<void> {
    const db = validateDB(rootState);

    const categories = await db.collection("foodCategories").get();
    const types = await db.collection("foodTypes").get();

    const foodCategories: unknown[] = [],
      foodTypes: unknown[] = [];
    categories.forEach(doc => foodCategories.push(constructFBData(doc)));
    types.forEach(doc => foodTypes.push(constructFBData(doc)));

    commit("set", { foodCategories, foodTypes });
  }
};
const mutations = {
  set(state: S, data: S): void {
    console.log(data);
    state.foodCategories = data.foodCategories;
    state.foodTypes = data.foodTypes;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
