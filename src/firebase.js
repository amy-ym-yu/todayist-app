import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsFwpXXAIEJchk8uL3aJ0wEMq5Eg7B9lE",
    authDomain: "todayist-c3b28.firebaseapp.com",
    projectId: "todayist-c3b28",
    storageBucket: "todayist-c3b28.appspot.com",
    messagingSenderId: "941265907808",
    appId: "1:941265907808:web:ff8241e13a7a59a6965305",
    measurementId: "G-4WS3QW1ZHT"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig); // eslint-disable-next-line
  const db = getFirestore(app); 

  export { db }