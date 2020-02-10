/* global process */
import firebase from "@/firebase/";

export default function({ app, store }, { inject }) {
  if (process.client) {
    firebase.auth().onAuthStateChanged(user => {
      store.commit("setUser", user);
    });
  }
}
