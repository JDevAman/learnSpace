import { UserModel } from "../db";
import throwError from "./error";

export async function getUserIdByEmail(email: string) {
  const user = await UserModel.findOne({
    userName: email.toLowerCase(),
  }).select("_id");
  if (!user) throwError("Recipient not found", 404);
  return user._id;
}
