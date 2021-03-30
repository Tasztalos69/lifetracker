import firebase from "firebase";
import Firestore = firebase.firestore.Firestore;
import { DateSleepRow, FoodPart, SupplementDrinkRow } from "@/types/editor";

export type nFirestore = Firestore | null;

export type Nullable<T> = T | null;

export enum ColorSchemes {
  DEFAULT = "#000000",
  GREEN = "#00ff00"
}

export interface UserSettings {
  selectedPerson: Nullable<string>;
  colorScheme: ColorSchemes;
}

export interface Person {
  id: string;
  name: string;
  daysLogged: number;
}

export interface Day extends DateSleepRow, FoodPart, SupplementDrinkRow {
  personId: string;
}

export interface Sleep {
  start: string;
  end: string;
  duration?: string;
}

export interface Meal {
  time: string;
  foods: Food[];
}

export interface Food {
  typeId: string;
  amount: number;
}

export interface SupplementType {
  id: string;
  name: string;
  unit: string;
  step: number;
}

export interface FoodType {
  id: string;
  name: string;
  categoryId: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  icon: string[];
}
