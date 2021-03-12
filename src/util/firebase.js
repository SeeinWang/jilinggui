import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyB_38SpnFcFu6OVSyqefOOZhO2LQVbPJps",
    authDomain: "jilinggui-a5caa.firebaseapp.com",
    projectId: "jilinggui-a5caa",
    storageBucket: "jilinggui-a5caa.appspot.com",
    messagingSenderId: "789021136840",
    appId: "1:789021136840:web:a567a1b2679483dcca52fd",
    measurementId: "G-X28MZ0HBV3"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;