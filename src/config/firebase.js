import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBywU96XsEhRoeP663Mf4d5C6kRv-JtxiI",
  authDomain: "portifolio-90aa7.firebaseapp.com",
  projectId: "portifolio-90aa7",
  storageBucket: "portifolio-90aa7.appspot.com",
  messagingSenderId: "1072932940228",
  appId: "1:1072932940228:web:97a0b94bc1515378d05c91"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);