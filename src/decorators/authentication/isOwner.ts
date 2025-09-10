import fastifyPlugin from "fastify-plugin";
import type { Usuario } from "../../models/usuario_model.ts";
import { PC_Forbidden, PC_InternalServerError, PC_NoAuthorized } from "../../errors/errors.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("isOwner", (req, rep) => {
    const usuario = (req as any).user
                console.log(usuario)
                if (!(req.params.id_usuario === usuario.id_usuario)) throw new PC_Forbidden()
    return
  });
});

declare module "fastify" {
  interface FastifyInstance {
    isOwner(req, rep): void;
  }
}
