import { type Usuario, usuarioSchema } from "../../../models/usuario_model.ts";
import { Type } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { PC_BadRequest, PC_NoAuthorized } from "../../../errors/errors.ts";
import type { FastifyRequest } from "fastify";

const usuarioRoutes:FastifyPluginAsyncTypebox= async function(fastify, options: object) {
  fastify.addHook("onRequest", fastify.authenticate)
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener usuario por id",
        description: "Obtener un usuario especifico según su ID",
        tags: ["usuarios"],
        params: Type.Pick(usuarioSchema, ["id_usuario"]),
        response: {
            200: usuarioSchema
        },
        security: [
            { bearerAuth: [] }
        ]
      },
    },
    async function handler(req, rep) {
      return fastify.UsersDB.getById(req.params.id_usuario)
    }
  );
  fastify.put(
    "",
    {
      schema: {
        summary: "Modificar usuarios",
        description: "Esta ruta permite modificar un nuevo usuario.",
        tags: ["usuarios"],
        params: Type.Pick(usuarioSchema, ["id_usuario"]),
        body: Type.Partial(usuarioSchema),
        response: {
          204: Type.Null()
        },
        security: [
            { bearerAuth: [] }
        ]
      },
    },
    async function handler(req, rep) {
      const { id_usuario } = req.params; 
      const id_body = req.body.id_usuario 

      if (id_usuario !== id_body) throw new PC_BadRequest("Las ids del body y pasada por parametro, no coinciden.")
      await fastify.UsersDB.update(id_usuario, req.body);
      return rep.code(204).send();
    }
  );
  fastify.delete(
    "",
    {
      schema: {
        summary: "Eliminar usuarios",
        description: "Esta ruta permite eliminar un nuevo usuario.",
        tags: ["usuarios"],
        params: Type.Pick(usuarioSchema, ["id_usuario"]),
        response: {
          204: Type.Null()
        },
        security: [
            { bearerAuth: [] }
        ]
      },
    },
    async function handler(req, rep) {
      const { id_usuario } = req.params;
      await fastify.UsersDB.delete(id_usuario);
      return rep.code(204).send();
    }
  );
}

export default usuarioRoutes;