// const firebase = require('firebase');
const config = require('../config');
// firebase.initializeApp(config.firebaseConfig);
// var database = firebase.database();

const {initializeApp} = require('firebase/app');
const {getDatabase, push, child,ref,set, get, update, remove} = require('firebase/database');
const app = initializeApp(config.firebaseConfig);
const db = getDatabase(app);
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const resPattern = require("../helpers/resPattern");

const createDemo = async (req,res,next) => {
    try {
        const bodyData = req.body;

        const result = await set(ref(db, 'demo/' + bodyData.id), {
            username: bodyData.name,
            email: bodyData.email,
            password : bodyData.password,
            mobile : bodyData.mobile
        }).then((resp) => {
            console.log("result....",resp);
        });
        console.log("result",result);
        const obj = resPattern.successPattern(httpStatus.OK, {result}, `success`);
        return res.status(obj.code).json(obj);

        // database.ref('demo').set(bodyData)
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}



const getDemoData = async (req,res,next) => {
    try {
        const dbref = ref(db);
        const result = await get(child(dbref,"demo/"))
        const obj = resPattern.successPattern(httpStatus.OK, result, `success`);
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

const getOneDemo = async (req,res,next) => {
    try {
        const id = req.params.id;
        const dbref = ref(db);
        const result = await get(child(dbref,"demo/"+id));
        const obj = resPattern.successPattern(httpStatus.OK, result, `success`);
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

const updateDemo = async (req,res,next) => {
    try {
        const id = req.params.id;
        const bodyData = req.body;

        await update(ref(db, 'demo/' + id), {
            username: bodyData.name,
            email: bodyData.email,
            password : bodyData.password,
            mobile : bodyData.mobile
        });
        const obj = resPattern.successPattern(httpStatus.OK, {msg : "Updated successfully...!"}, `success`);
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}

const deleteDemo = async (req,res,next) => {
    try {
        const id = req.params.id;

        await remove(ref(db, 'demo/' + id));
        const obj = resPattern.successPattern(httpStatus.OK, {msg : "deleted successfully...!"}, `success`);
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(message, httpStatus.UNAUTHORIZED, true));
    }
}
module.exports = {
    createDemo,
    getDemoData,
    getOneDemo,
    updateDemo,
    deleteDemo
}