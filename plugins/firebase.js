import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

export const twProvider = new firebase.auth.TwitterAuthProvider()
export const fbProvider = new firebase.auth.FacebookAuthProvider()

export const emCredential = firebase.auth.EmailAuthProvider

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
firebase.analytics();
