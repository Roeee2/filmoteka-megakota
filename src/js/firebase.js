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

export function getWatchedByUser(email) {
    const q = query(collection(db, "watched"), where("user", "==", email));
    console.log(email);

    return new Promise((resolve, reject) => {
        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
                resolve({ data: querySnapshot, error: null });
            })
            .catch((error) => {
                console.log("No such document!");
                reject({ data: null, error: error });
            });
    });
}

export function getQueueByUser(email) {
    const q = query(collection(db, "queue"), where("user", "==", email));
    console.log(email);

    return new Promise((resolve, reject) => {
        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
                resolve({ data: querySnapshot, error: null });
            })
            .catch((error) => {
                console.log("No such document!");
                reject({ data: null, error: error });
            });
    });
}

export function addWatchedToUser(email, currentMovie) {
    const watched = doc(collection(db, "watched"));
    const data = {
        user: email,
        movie: currentMovie
    }

    return new Promise((resolve, reject) => {
        setDoc(watched, data)
            .then((data) => {
                console.log("Added: ", data);
                resolve(data);
            })
            .catch((error) => {
                console.log("No such document!");
                reject(error);
            });
    });
}

export function addQueueToUser(email, currentMovie) {
    const queue = doc(collection(db, "queue"));
    const data = {
        user: email,
        movie: currentMovie
    }

    return new Promise((resolve, reject) => {
        setDoc(queue, data)
            .then((data) => {
                console.log("Added: ", data);
                resolve(data);
            })
            .catch((error) => {
                console.log("No such document!");
                reject(error);
            });
    });
}