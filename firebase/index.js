import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBEgH0uBEx1jD5jSNGZA34wNapvy18JVO0",
    authDomain: "margay-93ee0.firebaseapp.com",
    databaseURL: "https://margay-93ee0.firebaseio.com",
    projectId: "margay-93ee0",
    storageBucket: "",
    messagingSenderId: "490490538062",
    appId: "1:490490538062:web:f82372d888d35ed7d8fb1f"
  });
}

firebase.auth().languageCode = "jp";

export default firebase;
