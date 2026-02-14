import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import userRouter from "./routes/user.js";
import prismaPlugin from "./lib/prisma-plugin.js";

const server = new Fastify({
  logger: true,
});

const schema = {
  type: "object",
  required: ["DATABASE_URL"],
  properties: {
    DATABASE_URL: { type: "string" },
    PORT: { type: "string", default: "4000" },
  },
};

const options = {
  confKey: "config", // fastify.config
  schema: schema,
  dotenv: true, // read your .env file
};

const startServer = async () => {
  try {
    await server.register(fastifyEnv, options);

    // Register - used for hooks, routers, plugins
    server.register(userRouter);
    server.register(prismaPlugin);

    server.get("/", (request, reply) => {
      return { message: "API is live" };
    });

    const PORT = server.config.PORT;
    server.listen({
      port: PORT,
    });
    server.log.info(`Server is listening on port: ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
