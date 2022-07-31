import {initializeApp} from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBLRfpwIpdKmVBsnYyOGV-dUn9_j-yfVg4",
    authDomain: "global-chat-244fb.firebaseapp.com",
    projectId: "global-chat-244fb",
    storageBucket: "global-chat-244fb.appspot.com",
    messagingSenderId: "92254559656",
    appId: "1:92254559656:web:996b0cfe3acdaf26b7519d",
    measurementId: "G-7SE3QRSN4Y"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {app, db, auth, provider}