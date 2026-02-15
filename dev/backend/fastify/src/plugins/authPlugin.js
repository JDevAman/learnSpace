import fp from "fastify-plugin";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";

async function authPlugin(server, options) {
  await server.register(cookie, { secret: options.cookieSecret});

  await server.register(jwt, {
    secret: options.jwtSecret,
    cookie: {
      cookieName: options.accessTokenName,
      signed: false,
    },
  });

  // We are updating server core fastify object to reuse this authenticate function
  server.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}

export default fp(authPlugin);
