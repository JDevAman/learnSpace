const createUserSchema = {
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

const getUserSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
  },
};

async function userRouter(fastify, opts) {
  fastify.get("/api/users", async (request, reply) => {
    const users = await fastify.prisma.User.findMany();
    reply.send(users);
  });

  fastify.post(
    "/api/user",
    { schema: createUserSchema },
    async (request, reply) => {
      await fastify.prisma.User.create({
        data: request.body,
      });
      reply.send({ message: "User Successfully Created" });
    },
  );

  fastify.get(
    "/api/user/:id",
    { schema: getUserSchema },
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
}

export default userRouter;
