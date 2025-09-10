import fastifyPlugin from "fastify-plugin";
import type { Usuario } from "../../models/usuario_model.ts";
import { PC_InternalServerError, PC_NoAuthorized } from "../../errors/errors.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("isAdminOrOwner", (req: FastifyRequest, rep: FastifyReply) => {
    if (!req.user) { throw new PC_InternalServerError()}
    const usuario = req.user
    if (!usuario.roles.includes("admin") && !(req.params.id_usuario === usuario.id_usuario))
        throw new PC_NoAuthorized()
    return
  });
});

declare module "fastify" {
  interface FastifyInstance {
    isAdminOrOwner(req: FastifyRequest, rep: FastifyReply): void;
  }
}