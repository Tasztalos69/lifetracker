import { RootState } from '@/store';
import firebase from 'firebase';
import Firestore = firebase.firestore.Firestore;

export default (rootState: RootState): Firestore => {
  const { db } = rootState;
  if (!db) throw Error;
  return db;
};
