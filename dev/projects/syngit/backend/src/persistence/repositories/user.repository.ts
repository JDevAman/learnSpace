import prisma from "@/lib/prisma";
import { Provider, User, Account } from "@prisma/client";

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  // Create user + LOCAL account in one transaction
  async createWithLocalAccount(params: {
    email: string;
    passwordHash: string;
  }): Promise<User> {
    const { email, passwordHash } = params;

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email },
      });

      await tx.account.create({
        data: {
          userId: user.id,
          provider: Provider.LOCAL,
          providerAccountId: user.id, // or email
          passwordHash,
        },
      });

      return user;
    });
  },

  // For login: get user + their LOCAL account
  async findWithLocalAccountByEmail(email: string): Promise<{
    user: User;
    account: Account;
  } | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (!user) return null;

    const localAccount = user.accounts.find(
      (acc) => acc.provider === Provider.LOCAL
    );

    if (!localAccount) return null;

    return { user, account: localAccount };
  },
};
