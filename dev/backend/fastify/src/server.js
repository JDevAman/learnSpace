import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import userRouter from "./routes/user.js";
import prismaPlugin from "./plugins/prismaPlugin.js";
import authPlugin from "./plugins/authPlugin.js";

const server = new Fastify({
  logger: true,
});

const schema = {
  type: "object",
  required: ["DATABASE_URL"],
  properties: {
    ACCESS_TOKEN: { type: "string" },
    COOKIE_SECRET: { type: "string" },
    DATABASE_URL: { type: "string" },
    JWT_SECRET: { type: "string" },
    PORT: { type: "string", default: "4000" },
    REFRESH_TOKEN: { type: "string" },
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
    await server.register(authPlugin, {
      jwtSecret: server.config.JWT_SECRET,
      cookieSecret: server.config.COOKIE_SECRET,
      accessTokenName: server.config.ACCESS_TOKEN,
    });
    await server.register(prismaPlugin);
    await server.register(userRouter, {
      prefix: "/api",
      accessTokenName: server.config.ACCESS_TOKEN,
      refreshTokenName: server.config.REFRESH_TOKEN,
    });

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
