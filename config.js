// const {initializeApp} = require('firebase/app');
// const {getFirestore,collection,getDocs,addDoc} = require('firebase/firestore');

// const firebaseConfig = {
//     apiKey: "AIzaSyCrdqzkpI2DvcMAjIFI2f9nny70w81u8g0",
//     authDomain: "myfirstdemo-9e62b.firebaseapp.com",
//     projectId: "myfirstdemo-9e62b",
//     storageBucket: "myfirstdemo-9e62b.appspot.com",
//     messagingSenderId: "961505702316",
//     appId: "1:961505702316:web:3b8636895c487e89e94a09",
//     measurementId: "G-F4G6ZYDGVS"
//   };

//   // Initialize Firebase
// const app = initializeApp(firebaseConfig);
//     const db = getFirestore(app);
    
//     getUsers = async (db) =>{
//         const User = collection(db,"Users");
//         const getUserData = await getDocs(User);
//         const userList = getUserData.docs.map(doc => doc.data());
//         return userList; 
//     }
//     createUser = async (db) => {
//         const User = collection(db,"Users");
//         const insertData = {
//             "name" : "vishvadatt",
//             "email" : "vishvadatt@yopmail.com",
//             "password" : "123456",
//             "mobile" : "9723999186"
//         }
//         const getUserData = await addDoc(insertData,User);
//         const userList = getUserData.docs.map(doc => doc.data());
//         return userList; 
//     }
//     getUsers(db);


const firebaseConfig = {
    apiKey: "AIzaSyCrdqzkpI2DvcMAjIFI2f9nny70w81u8g0",
    authDomain: "myfirstdemo-9e62b.firebaseapp.com",
    projectId: "myfirstdemo-9e62b",
    storageBucket: "myfirstdemo-9e62b.appspot.com",
    messagingSenderId: "961505702316",
    appId: "1:961505702316:web:3b8636895c487e89e94a09",
    measurementId: "G-F4G6ZYDGVS"
    }

module.exports = {
    firebaseConfig
}