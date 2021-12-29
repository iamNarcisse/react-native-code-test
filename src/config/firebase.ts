import firebase from "firebase/app";
import Constants from "expo-constants";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest.extra?.apiKey,
  authDomain: Constants.manifest.extra?.authDomain,
  projectId: Constants.manifest.extra?.projectId,
  storageBucket: Constants.manifest.extra?.storageBucket,
  messagingSenderId: Constants.manifest.extra?.messagingSenderId,
  appId: Constants.manifest.extra?.appId,
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
