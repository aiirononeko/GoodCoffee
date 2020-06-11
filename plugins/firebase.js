import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCWOvhK3DtYJMRQ3TWLWVs1-S4bT0IvbXs",
  authDomain: "cupping-a-coffee.firebaseapp.com",
  databaseURL: "https://cupping-a-coffee.firebaseio.com",
  projectId: "cupping-a-coffee",
  storageBucket: "cupping-a-coffee.appspot.com",
  messagingSenderId: "637461314359",
  appId: "1:637461314359:web:4edfd0c3f6b85aa6b8f8b2",
  measurementId: "G-WX2FGJQ7V9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
