// const firebase = require('../db');
const {initializeApp} = require('firebase/app');
const config = require('../config');
const app = initializeApp(config.firebaseConfig);
const {getFirestore,collection,getDocs,addDoc,getDoc,updateDoc,deleteDoc,doc} = require('firebase/firestore');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const resPattern = require("../helpers/resPattern");

const db = getFirestore(app);
const User = collection(db,"user");

// const User = require('../db');

const addStudent = async (req,res,next) => {
    try {
        const data = req.body;
        const insertUser = await addDoc(User,data)
        const obj = resPattern.successPattern(httpStatus.OK, {insertUser}, `success`);
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

const getUsers = async (req,res,next) => {
    try {
        let userList = []
        const getUserData = await getDocs(User);
        getUserData.docs.map((el,i) => {
            userList.push({...el.data(),id : el.id})
        });
        const obj = resPattern.successPattern(httpStatus.OK, {userList}, `success`);
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

const findOneUsers = async (req,res,next) => {
    try {
        const id = req.params.id;
        const findUser = doc(db,"user",id); 
        const getUser = await getDoc(findUser);
        const obj = resPattern.successPattern(httpStatus.OK, {...getUser.data(),id : getUser.id}, `success`);
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

const updateUser = async (req,res,next) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const findUser = doc(db,"user",id);
        const updateUser = await updateDoc(findUser,data)
        const obj = resPattern.successPattern(httpStatus.OK, {message : "updated Successfully...!"}, `success`);
        return res.status(obj.code).json(obj);

    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

const deleteUser = async (req,res,next) => {
    try {
        const id = req.params.id;
        const findUser = doc(db,"user",id);
        await deleteDoc(findUser)
        const obj = resPattern.successPattern(httpStatus.OK, {message : "deleted Successfully...!"}, `success`);
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

module.exports = {
    addStudent,
    getUsers,
    findOneUsers,
    updateUser,
    deleteUser
};