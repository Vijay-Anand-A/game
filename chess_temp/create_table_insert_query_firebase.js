import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDHup4M5P3z-fy9fVRElBx0hutREWZGSAM",
  authDomain: "anandhavruksham-3aa36.firebaseapp.com",
  projectId: "anandhavruksham-3aa36",
  storageBucket: "anandhavruksham-3aa36.firebasestorage.app",
  messagingSenderId: "604117717957",
  appId: "1:604117717957:web:3df03ca1c702dba99331ac"
};

const app = initializeApp(firebaseConfig);   
const db = getFirestore(app);                 

// create default admin (RUN ONLY ONCE)
setDoc(doc(db, 'login', '1'), {
  id: 1,
  dept: "ad",
  username: "admin",
  password: "admin"
})
.then(() => {
  console.log("Admin created in Firestore");
})
.catch((error) => {
  console.error("Error:", error);
});
