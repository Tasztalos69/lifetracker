import firebase from "firebase/app";

export interface AuthState {
  authorized: boolean;
  user: firebase.User | null;
  isContentManager: boolean;
}

export enum PopupType {
  INFO = "info-circle",
  WARN = "exclamation-triangle",
  ERROR = "exclamation-circle"
}

export interface Popup {
  text: string;
  type: PopupType;
}

export interface PopupState {
  popups: Popup[];
}
