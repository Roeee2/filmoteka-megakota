import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, collection, setDoc, query, where, updateDoc, deleteDoc } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyCKrE1LHdT4LVrzkNZPPd-s99r7FhJQp54",
    authDomain: "filmoteka-d8e90.firebaseapp.com",
    projectId: "filmoteka-d8e90",
    storageBucket: "filmoteka-d8e90.appspot.com",
    messagingSenderId: "514148022233",
    appId: "1:514148022233:web:00cadab78ff175b207cbc8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function tryLoginUser(email, password) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve({ data: userCredential, error: null });
            })
            .catch((error) => {
                reject({ data: null, error: error });
            });
    });
}

export function tryLogoutUser() {
    return new Promise((resolve, reject) => {
        signOut(auth)
            .then(() => {
                resolve({ data: "Sucess", error: null });
            })
            .catch((error) => {
                reject({ data: null, error: error });
            });
    });
}

export function tryCreateUser(email, password) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve({ data: userCredential, error: null });
            })
            .catch((error) => {
                reject({ data: null, error: error });
            });
    });
}