import Fastify from 'fastify';
import { join } from 'path';
import autoload from '@fastify/autoload';
import swagger from '@fastify/swagger'; 
import swaggerUi from '@fastify/swagger-ui';
import postgres from './src/plugins/postgres.ts';
import usersDB from './src/decorators/usersDB/usersDB_decorator.ts';

const fastify = Fastify({
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss Z'
            }
        }
    }
});

// Registra y configura el plugin de swagger
await fastify.register(swagger, {
    swagger: {
        info: {
            title: 'API de PDC',
            description: 'Documentación de la API del proyecto PDC',
            version: '1.0.0'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
});

// Registra el plugin para la interfaz gráfica de swagger
await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    }
});

await fastify.register(autoload, {
    dir: join(import.meta.dirname, 'src', 'routes')
});
await fastify.register(postgres)
await fastify.register(usersDB)

const port = Number(process.env.PORT) || 3000;
const host = '::';

try {
    await fastify.listen({ port, host });
    fastify.log.info(`Servidor corriendo en http://localhost:${port}`);
    fastify.log.info(`La documentación de la API está en http://localhost:${port}/docs`);
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}