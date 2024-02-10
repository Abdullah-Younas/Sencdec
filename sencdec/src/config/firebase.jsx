import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAaDKS31LvSqbBXvs-pICzH3C_i_IagkZQ",
  authDomain: "sencdec.firebaseapp.com",
  projectId: "sencdec",
  storageBucket: "sencdec.appspot.com",
  messagingSenderId: "776108973983",
  appId: "1:776108973983:web:b3a7fd663f2db556cc67aa",
  measurementId: "G-W03PS7T1XM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);