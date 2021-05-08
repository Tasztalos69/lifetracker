import firebase from 'firebase';
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export default (doc: QueryDocumentSnapshot): Record<string, unknown> => ({
  ...doc.data(),
  id: doc.id,
});
