import Fastify from 'fastify';
import { join } from 'path';
import autoload from '@fastify/autoload';

const fastify = Fastify({
    logger: {
        level: process.env.FASTIFY_LOG_LEVEL || 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss Z'
            }
        }
    }
});

await fastify.register(autoload, {
    dir: join(import.meta.dirname, 'src', 'plugins')
});

await fastify.register(autoload, {
    dir: join(import.meta.dirname, 'src', 'decorators')
});

await fastify.register(autoload, {
    dir: join(import.meta.dirname, 'src', 'routes'),
    routeParams: true
});

const port = Number(process.env.FASTIFY_PORT) || 3000;
const host = '::';

try {
    await fastify.listen({ port, host });
    fastify.log.info(`Servidor corriendo en http://localhost:${port}`);
    fastify.log.info(`La documentación de la API está en http://localhost:${port}/docs`);
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}