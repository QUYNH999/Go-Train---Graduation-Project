import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBmyuxOn5gzYCAppkZ4RKrX9vRRQ2F4Mss",
    authDomain: "trainbookingapp-1eb48.firebaseapp.com",
    databaseURL: "https://trainbookingapp-1eb48-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trainbookingapp-1eb48",
    storageBucket: "trainbookingapp-1eb48.appspot.com",
    messagingSenderId: "1088715079488",
    appId: "1:1088715079488:web:088ac8e873a220903d44a5",
    measurementId: "G-BJYNZBSSCX"
};

initializeApp(firebaseConfig);
export const database = getDatabase()
