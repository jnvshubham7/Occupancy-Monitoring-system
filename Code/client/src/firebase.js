import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyCB4C69lcp-t6uwY6hZG9sQkd-KCD8STKQ",
   authDomain: "occupancyms.firebaseapp.com",
   projectId: "occupancyms",
   storageBucket: "occupancyms.appspot.com",
   messagingSenderId: "990246154774",
   appId: "1:990246154774:web:61d400a2d44644e183fb37",
   measurementId: "G-X8M341D1PD"
};

//  Firebase database
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//  Firebase authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();