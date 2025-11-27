import bcrypt from "bcrypt";
import { userRepository } from "@/repositories/user.repository";
import { signAccessToken } from "@/utils/jwt";
import type { User } from "@prisma/client";

export class AuthService {
  async register(email: string, password: string): Promise<{
    user: Pick<User, "id" | "email">;
    token: string;
  }> {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error("Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.createWithLocalAccount({
      email,
      passwordHash,
    });

    const token = signAccessToken(user.id);

    return {
      user: { id: user.id, email: user.email },
      token,
    };
  }

  async getUserById(userId: string): Promise<User | null> {
    return userRepository.findById(userId);
  }
}

export const authService = new AuthService();
