import fp from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";

const USERNAME = process.env.POSTGRESS_USERNAME
const PASSWORD = process.env.POSTGRESS_PASSWORD
const DOMAIN = process.env.POSTGRESS_DOMAIN
const PORT = process.env.POSTGRESS_PORT
const DATABASE = process.env.POSTGRESS_DATABASE

const conectionLink = `postgres://${USERNAME}:${PASSWORD}@${DOMAIN}:${PORT}/${DATABASE}`;

export default fp(async (fastify) => {
    fastify.register(fastifyPostgres, {
        connectionString: conectionLink
    })  
});
