import fp from "fastify-plugin";
import { PrismaClient } from "./prisma.js";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaPlugin = fp(async (server, options) => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$connect();
    server.log.info("Prisma Successfully connected");
  } catch (err) {
    server.log.error("Database connection error");
    throw err;
  }

  // Add prisma to server object
  server.decorate("prisma", prisma);

  // Closed DB connection upon server closing.
  server.addHook("onClose", async (server) => {
    await server.prisma.$close();
  });
});

export default prismaPlugin;
