import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCGaKkIKroJ-Qm1BxEPGRbZz60SXGLfjzY",
    authDomain: "login-4765e.firebaseapp.com",
    databaseURL: "https://login-4765e.firebaseio.com",
    projectId: "login-4765e",
    storageBucket: "login-4765e.appspot.com",
    messagingSenderId: "437617707854"
    };

    firebase.initializeApp(config)
    export const ref = firebase.database().ref();
    export const auth = firebase.auth;
    export const provider = new firebase.auth.GoogleAuthProvider();