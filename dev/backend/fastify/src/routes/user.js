import bcrypt from "bcrypt";

const signUpSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
};
const signInSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
const getUserSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
  },
};

async function userRouter(fastify, options) {
  // signup
  fastify.post(
    "/user/signup",
    { schema: signUpSchema },
    async (request, reply) => {
      const { email, name, password } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await fastify.prisma.User.create({
        data: { email, name, password: hashedPassword },
      });
      reply.send({ message: "User Successfully Created" });
    },
  );

  // Signin
  fastify.post(
    "/user/signin",
    { schema: signInSchema },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await fastify.prisma.User.findUnique({
        where: { email },
      });
      if (!user)
        return reply.code(401).send({ message: "Invalid credentials" });

      // Compare the plain text password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return reply.code(401).send({ message: "Invalid credentials" });

      const accessToken = await fastify.jwt.sign(
        { id: user.id, email: user.email },
        { expiresIn: "15m" },
      );
      const refreshToken = await fastify.jwt.sign(
        { id: user.id },
        { expiresIn: "7d" },
      );

      return reply
        .setCookie(options.accessTokenName, accessToken, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .setCookie(options.refreshTokenName, refreshToken, {
          path: "/refresh",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .send({ message: "Login successful" });
    },
  );

  fastify.get(
    "/me",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      return { user: request.user };
    },
  );

  fastify.get(
    "/users",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const users = await fastify.prisma.User.findMany({
        select: { name: true, email: true },
      });
      reply.send(users);
    },
  );

  fastify.get(
    "/user/:id",
    { schema: getUserSchema, preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const { id } = request.params;
      const user = await fastify.prisma.User.findUnique({
        where: { id },
        select: { name: true, email: true },
      });

      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }
      return user;
    },
  );

  fastify.get("/", () => {});
}

export default userRouter;
