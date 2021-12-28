import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh5BtDMa6WScd-A6tcHLxYBS1sUP4tEzU",
  authDomain: "stayr-71ae0.firebaseapp.com",
  projectId: "stayr-71ae0",
  storageBucket: "stayr-71ae0.appspot.com",
  messagingSenderId: "858622376835",
  appId: "1:858622376835:web:8d751252e841c4565894b6",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
