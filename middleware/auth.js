import firebase from "@/firebase/";

export default function({ app, store }) {
  const user = firebase.auth().currentUser;

  if (!user) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          store.commit("setUser", user);
        }
        resolve(user);
      });
    });
  }
}
