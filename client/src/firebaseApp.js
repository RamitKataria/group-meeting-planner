// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBm4gBZQvlOpCQeKMJnOp8qoLt3vIilFGw",
    authDomain: "plan-meetings.firebaseapp.com",
    projectId: "plan-meetings",
    storageBucket: "plan-meetings.appspot.com",
    messagingSenderId: "45566872883",
    appId: "1:45566872883:web:5928159d4284cd01c0c246"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getAuth(app);
