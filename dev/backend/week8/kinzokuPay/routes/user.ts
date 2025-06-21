const express = require("express");
const { signjwt } = require("../middlewares/tokens");
const config = require("../config");
const argon2 = require("argon2");
const { userLoginModel, userSignUpModel, updateInfoModel } = require("../db");
const throwError = require("../middlewares/error");
const { userSignInSchema, userSignUpSchema, updateUserSchema } = require("../schema/userValidator");
const userRouter = express.Router();
const authenticate = require("../middlewares/authMiddleware");


// cookies with jwt instead of localStorage
// No JWT issued here
userRouter.post('/signup', async function (req, res) {
    try {
        const signUpBody = userSignUpSchema.safeParse(req.body);
        if (signUpBody.success) {
            const parsedObj = signUpBody.data;
            const hashedPw = await argon2.hash(parsedObj.password + config.pepper);
            await userSignUpModel.create({
                ...parsedObj,
                password: hashedPw
            })
            res.status(201).send({
                message: "User Succesfully Created"
            });
        }
        else {
            res.status(512).send({
                message: "Please check your input data!"
            })
        }
    }
    catch {
        throwError("Couldn't Sign Up!", 409);
    }

})

// login should be post instead of get as get can expose credentials
userRouter.post('/signin', async function (req, res) {
    try {
        const signInBody = userSignInSchema.safeParse(req.body);
        if (signInBody.success) {
            const parsedObj = signInBody.data;
            const fetchedDetails = await userLoginModel.findOne({ userName: parsedObj.userName });
            const passwordCompare = await argon2.verify(fetchedDetails.password, parsedObj.password + config.pepper);
            if (!passwordCompare) {
                return res.status(402).send({
                    message: "Please give valid credentials"
                })
            }
            const payload = {
                userName: fetchedDetails.userName
            }
            const token = signjwt(payload);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                path: "/",
                maxAge: 60 * 60 * 1000
            })
            res.status(201).send({
                message: "Successfully logged in!"
            });
        }
        else {
            res.status(512).send({
                message: "Please give valid credentials"
            })
        }
    }
    catch (err) {
        console.error(err);
        throwError("Couldnt Sign In!", 409);
    }

})

// auth middleware
userRouter.use(authenticate);
// find users with name ?filer=<name>
userRouter.get("/bulk", async function (req, res) {
    const filterParams = req.query.filter;
    if (filterParams !== '') {
        const users = await userLoginModel.find({
            $or: [
                { firstName: { $regex: filterParams } },
                { lastName: { $regex: filterParams } },
            ]
        })
        console.log(users);
    }
    res.send({
        status: 200,
    });
})


userRouter.put('/update-profie', authenticate, async function (req, res) {
    const updateUserBody = updateUserSchema.safeParse(req.body);
    if (updateUserBody.success) {
        const updatedDetails = updateUserBody.data;
        await updateInfoModel.updateOne({ userName: req.user.userName }, { $set: updatedDetails });
    }
    console.log(updateUserBody);
    res.status(201).send({ message: "User Profile Updated" });
})

userRouter.post('/logout', (req, res) => {
    res.clearCookie("token");
    res.send({ message: "Logged out" });
});

module.exports = userRouter;