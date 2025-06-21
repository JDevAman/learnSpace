const { z } = require("zod");

const email = z.string().email();
const password = z.string().min(6);
const firstName = z.string().max(20);
const lastName = z.string().max(20);

const userSignInSchema = z.object({
    userName: email,
    password
});

const userSignUpSchema = z.object({
    userName: email,
    firstName: firstName,
    lastName: lastName,
    password
});

const updateUserSchema = z.object({
    firstName: firstName,
    lastName: lastName,
    password
});

module.exports = { userSignInSchema, userSignUpSchema, updateUserSchema };
