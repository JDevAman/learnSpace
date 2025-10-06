import { z } from "zod";

const email = z.string().email();
const password = z.string().min(6);
const firstName = z.string().max(20);
const lastName = z.string().max(20);
const avatar = z.string().url("Invalid avatar URL").optional();

const userSignInSchema = z.object({
  userName: email,
  password,
});

const userSignUpSchema = z.object({
  userName: email,
  firstName: firstName,
  lastName: lastName,
  password,
  avatar: avatar.optional(),
});

const updateUserSchema = z.object({
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  email: email.optional(),
  password: password.optional(),
  avatar: avatar.optional(),
});

export { userSignInSchema, userSignUpSchema, updateUserSchema };
