import fastifyPlugin from "fastify-plugin";
import type { Usuario } from "../../models/usuario_model.ts";
import { PC_NoAuthorized } from "../../errors/errors.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("authenticate",async (req: FastifyRequest, rep: FastifyReply) => {
    await req.jwtVerify()    
  });
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate(req: FastifyRequest, rep: FastifyReply): void;
  }
}