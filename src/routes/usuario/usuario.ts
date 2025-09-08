import type { FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../errors/errors';

const usuariosRoutes: FastifyPluginAsync = async (fastify, opts) => {

    fastify.get('/', async (request, reply) => {
        throw new PC_NotImplemented('GET /api/usuarios - Obtener todos los usuarios');
    });

    fastify.post('/', async (request, reply) => {
        throw new PC_NotImplemented('POST /api/usuarios - Crear un nuevo usuario');
    });

    fastify.get('/:id', async (request, reply) => {
        throw new PC_NotImplemented('GET /api/usuarios/:id - Obtener un usuario por ID');
    });

    fastify.put('/:id', async (request, reply) => {
        throw new PC_NotImplemented('PUT /api/usuarios/:id - Actualizar un usuario');
    });

    fastify.delete('/:id', async (request, reply) => {
        throw new PC_NotImplemented('DELETE /api/usuarios/:id - Eliminar un usuario');
    });
};

export default usuariosRoutes;