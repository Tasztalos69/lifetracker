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

export interface SupplementType {
  id: string;
  name: string;
  unit: string;
  step: number;
}