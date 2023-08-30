const firebase = require('firebase/database');
// // const {initializeApp} = require('firebase/app');
const {initializeApp} = require('firebase/app');
const config = require('./config');
const {getFirestore,collection} = require('firebase/firestore');

// const db = firebase.initializeApp(config.firebaseConfig);

// module.exports = db;
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const User = collection(db,"user");



module.exports = {
    User
}