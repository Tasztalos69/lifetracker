import firebase from 'firebase/app';
import {
  SupplementType,
  Nullable,
  Person,
  FoodCategory,
  FoodType,
  Day,
} from './firestore';
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export interface AuthState {
  authorized: boolean;
  user: firebase.User | null;
  isContentManager: boolean;
}

export enum PopupType {
  INFO = 'info-circle',
  WARN = 'exclamation-triangle',
  ERROR = 'exclamation-circle',
}

export interface Popup {
  text: string;
  type: PopupType;
}

export interface PopupState {
  popups: Popup[];
}

export interface PeopleState {
  availablePeople: Person[];
  selectedPersonData: Nullable<Person>;
}

export interface SupplementState {
  supplementTypes: SupplementType[];
}

export interface FoodState {
  foodCategories: FoodCategory[];
  foodTypes: FoodType[];
}

export interface KeypadState {
  ref: string[];
  value: string;
  maxLength: number;
  delimiter: Nullable<':' | '.'>;
  delimiterCount: number;
  placeholder: string;
  error?: string;
}

export interface LogState {
  days: Day[];
  lastVisible: Nullable<QueryDocumentSnapshot>;
  isListEnd: boolean;
}

export interface ModalState {
  title: string;
  description?: string;
  okBtn: string;
  closeBtn: string;
  callback: () => any;
}
