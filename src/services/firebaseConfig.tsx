import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt2CRJ2kzXQv6BUxIB3IdIXEWcdnQ2axI",
  authDomain: "redstay-df78e.firebaseapp.com",
  projectId: "redstay-df78e",
  storageBucket: "redstay-df78e.firebasestorage.app",
  messagingSenderId: "220136847186",
  appId: "1:220136847186:web:0d63708be15158fb842c8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export  {auth}