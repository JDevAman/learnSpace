const mongoose = require("mongoose");
const config = require('./config')

mongoose.connect(config.mongoURI).then(() => {
    console.log("Connected to mongoDB")
}).catch((err) => {
    console.error({ 'error': err });
});

const userSignUpSchema = new mongoose.Schema({
    userName: {
        type: String, required: true, minLength: 3, maxlength: 30, lowercase: true, unique: true, trim: true
    },
    firstName: {
        type: String, required: true, maxlength: 20
    },
    lastName: {
        type: String, required: true, maxlength: 20
    },
    password: {
        type: String, required: true, minLength: 6
    },
})

const userSignInSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true }
})

const updateInfoSchema = new mongoose.Schema({
    firstName: { type: String, maxlength: 20 },
    lastName: { type: String, maxlength: 20 },
    password: { type: String, minLength: 6 },
})

const userLoginModel = mongoose.model('signin', userSignInSchema, "users")
const userSignUpModel = mongoose.model('signup', userSignUpSchema, "users")
const updateInfoModel = mongoose.model('updateInfo', updateInfoSchema, "users")
module.exports = { userLoginModel, userSignUpModel, updateInfoModel };