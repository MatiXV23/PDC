import fastifyPlugin from "fastify-plugin";
import type { Usuario } from "../../models/usuario_model.ts";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("verifyAdmin", (usuario: Usuario) => {
    return usuario.roles.includes("admin");
  });
});

declare module "fastify" {
  interface FastifyInstance {
    verifyAdmin(usuario: Usuario): boolean;
  }
}