import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKjXCoPfBPt2ETGk8w4XfrcKarTEUkK-Y",
  authDomain: "pmsa-64cfb.firebaseapp.com",
  projectId: "pmsa-64cfb",
  storageBucket: "pmsa-64cfb.appspot.com",
  messagingSenderId: "41958405197",
  appId: "1:41958405197:web:47c8f9051035f12367d804",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
