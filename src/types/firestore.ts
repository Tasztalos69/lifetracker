import firebase from "firebase";
import Firestore = firebase.firestore.Firestore;

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

export interface Day {
  personId: string;
  date: string;
  sleep: Sleep;
  meals: Meal[];
  supplements: number[];
  drink: number;
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
