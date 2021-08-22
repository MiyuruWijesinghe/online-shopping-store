import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDTCAPd3WFWzy4BjbhsnkOM5g7lnNzonW4",
    authDomain: "icaf-docs.firebaseapp.com",
    projectId: "icaf-docs",
    storageBucket: "icaf-docs.appspot.com",
    messagingSenderId: "872667571865",
    appId: "1:872667571865:web:8cad9788c8b7fd81a5fa08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}