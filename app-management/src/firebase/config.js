import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
//import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

//Firebase config here
const firebaseConfig = {
    apiKey: "AIzaSyC3pEWqYcgfiV0XxX37oI_DVcVTs-b6uYA",
    authDomain: "chardsapp.firebaseapp.com",
    projectId: "chardsapp",
    storageBucket: "chardsapp.appspot.com",
    messagingSenderId: "286021236614",
    appId: "1:286021236614:web:53f88325420383aec21e07"
  };

  // Initializa Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  // Initialize services
  const db = initializeFirestore(firebaseApp, {
    ignoreUndefinedProperties: true,
  });
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);

  // Timestamp
  const timestamp = serverTimestamp();

  export { db, auth, storage, timestamp };