import { Food, Meal, Sleep } from "@/types/firestore";

export interface DateSleepRow {
  date: string;
  sleep: Sleep;
}

export interface FoodPart {
  meals: Meal[];
}

export interface FoodRow extends FoodPart {
  newMeal: Partial<Meal>;
  newFood: NewFood[];
  showNewMeal: boolean;
}

interface NewFood extends Partial<Food> {
  showDropdown: boolean;
  selectedCategory: string;
}

export interface SupplementDrinkRow {
  supplements: number[];
  drink: number;
}
