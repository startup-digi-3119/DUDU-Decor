import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCplPhAx-UTH6Q9qzm-KCCcEMbJ7oljOXg",
    authDomain: "dudu-decors.firebaseapp.com",
    projectId: "dudu-decors",
    storageBucket: "dudu-decors.firebasestorage.app",
    messagingSenderId: "123920487348",
    appId: "1:123920487348:web:b84fa6d1118069131158e1",
    measurementId: "G-L8Z4XD05WM"
};

import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
