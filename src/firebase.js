import { getFirestore, QuerySnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmsp7nNM6HQDMrE1aoi40LtC7EmWu-uHU",
  authDomain: "markdown-editor-daafb.firebaseapp.com",
  projectId: "markdown-editor-daafb",
  storageBucket: "markdown-editor-daafb.appspot.com",
  messagingSenderId: "6721552290",
  appId: "1:6721552290:web:87e32be5945c4da8883cfb",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
