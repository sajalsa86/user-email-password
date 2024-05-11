// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNbA3NUEMrHF0fvKOWpLHpvfz9egmn-FQ",
    authDomain: "user-email-password-ce3d9.firebaseapp.com",
    projectId: "user-email-password-ce3d9",
    storageBucket: "user-email-password-ce3d9.appspot.com",
    messagingSenderId: "563115558627",
    appId: "1:563115558627:web:27ea12b595a96e2e62a7d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;