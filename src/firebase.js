import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB3Cm0rejUVscGWivnwnJGmIz9G-fXWJ_Q",
    authDomain: "piwo6-cf927.firebaseapp.com",
    projectId: "piwo6-cf927",
    storageBucket: "piwo6-cf927.appspot.com",
    messagingSenderId: "260533889824",
    appId: "1:260533889824:web:93c2afc3de84a545944545",
    measurementId: "G-WJV2YQ1Z61"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const getUserData = async (user) => {
    return firestore.collection("users").doc(user.uid).get();
}

export const updateUserData = async (user, userData) => {
    return firestore.collection("users").doc(user.uid).update({
        ...userData
    });
}

export const addPost = (user, postData) => {

    firestore.collection("posts").add({
        owner: user.uid,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        a: postData.a,
        b: postData.b,
        c: postData.c,
        d: postData.d,
    });

}

export const getAllPosts = () => {
    return firestore.collection("posts").get();
}