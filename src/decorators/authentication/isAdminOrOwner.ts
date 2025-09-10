import fastifyPlugin from "fastify-plugin";
import type { Usuario } from "../../models/usuario_model.ts";
import { PC_Forbidden } from "../../errors/errors.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("isAdminOrOwner", async (req, rep) => {
    const usuario = (req as any).user
    if (!usuario.roles.includes('admin') && !(req.params.id_usuario === usuario.id_usuario)) throw new PC_Forbidden()
  });
});

declare module "fastify" {
  interface FastifyInstance {
    isAdminOrOwner(req, rep): void;
  }
}