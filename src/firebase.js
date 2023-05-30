import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCZvmzMW7cLd5z34IexkMIhgUEDpca0hkc",
    authDomain: "firechat-8b345.firebaseapp.com",
    projectId: "firechat-8b345",
    storageBucket: "firechat-8b345.appspot.com",
    messagingSenderId: "205369552418",
    appId: "1:205369552418:web:02a0ac0d4de408fb63e47b",
    measurementId: "G-SL1ZZZ50PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider()
const auth = getAuth()
export {provider,app,auth};