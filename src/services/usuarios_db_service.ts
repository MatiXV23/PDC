import { BaseRepository } from "../models/baseRepository.ts";
import  type { Usuario, Credenciales } from "../models/usuario_model.ts";
import fastify, { type FastifyInstance } from "fastify";
import { PC_BadRequest, PC_InternalServerError, PC_NotFound, PC_NotImplemented } from "../errors/errors.ts";


export class UsuariosDB extends BaseRepository<Usuario> {
    #baseQuery = `SELECT 
                    u.*, array_agg(r.nombre) AS roles
                FROM usuarios u
                LEFT JOIN usuarios_roles ru ON u.id_usuario = ru.id_usuario
                LEFT JOIN roles r ON ru.id_rol = r.id_rol
                `

    constructor(fastify: FastifyInstance) {
        super(fastify)
    }

    

    async getAll(): Promise<Usuario[]> {
        const users = await this.pg.query<Usuario>(this.#baseQuery+'GROUP BY u.id_usuario;')

        return users.rows
    }
    
    async getById(id:number): Promise<Usuario> {
        const query = this.#baseQuery + `WHERE u.id_usuario = $1
                                        GROUP BY u.id_usuario;`
        const vars = [id]
        const res = await this.pg.query<Usuario>(query, vars)
        
        if (res.rowCount === 0) throw new PC_NotFound(`Usuario con id (${id}) no encontrado`)
        return res.rows[0]
    }

    async create(data: Partial<Usuario>): Promise<Usuario> {
    // ... Tu código SQL
    let query = ` WITH nuevo_usuario AS (
        INSERT INTO usuarios (username, email, activo, reputacion, fecha_nacimiento, nombres, apellidos, edad, sexo, foto_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id_usuario
        ),
        cred AS (
        INSERT INTO credenciales (id_usuario, password_hash)
        SELECT id_usuario, crypt('miPasswordSeguro', gen_salt('bf'))
        FROM nuevo_usuario
        RETURNING id_usuario
        ),
        roles_insertados AS (
        INSERT INTO usuarios_roles (id_usuario, id_rol)
        -- *** CORRECCIÓN: USAR JOIN EN LUGAR DE COMAS ***
        SELECT c.id_usuario, r.id_rol
        FROM cred c
        JOIN roles r ON (r.nombre = 'user'
    `
    if (data.roles?.includes('admin')) query += `OR r.nombre = 'admin')`
    else query += `)` // Asegurar que el paréntesis se cierre si no hay rol de admin
    query += ` RETURNING id_usuario)
    SELECT id_usuario from roles_insertados;`

    const {username, email, activo, reputacion, fecha_nacimiento, nombres, apellidos, edad, sexo, foto_url, roles} = data
    try{
        const res = await this.pg.query(query, [username, email, activo, reputacion, fecha_nacimiento, nombres, apellidos, edad, sexo, foto_url || null])
        
        // CORRECCIÓN: Reemplazamos la llamada a getById por una consulta directa
        // para garantizar que devolvemos un objeto plano y serializable.
        const createdUserResult = await this.pg.query(this.#baseQuery + ` WHERE u.id_usuario = $1 GROUP BY u.id_usuario;`, [res.rows[0].id_usuario]);
        
        if (createdUserResult.rowCount === 0) {
            throw new PC_InternalServerError('El usuario fue creado, pero no se pudo recuperar.')
        }
        
        return createdUserResult.rows[0];
    }
    catch (err){
        throw new PC_InternalServerError(err.message)
    }
}

    async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
        let query = `UPDATE usuarios
                        SET 
                    `
        let cont = 2;
        let vars = [id]
        
        for (const key in data){
            if (!data[key] || key === 'id_usuario') continue

            query += `${key} = $${cont},`
            vars.push(data[key])
            cont++
        }
        query = query.slice(0, -1)

        query += `  WHERE id_usuario = $1
                    RETURNING id_usuario;`
       
        console.log(query)
        console.log(vars)
        const res = await this.pg.query(query, vars)


        return await this.getById(id)
    }

    async delete(id: number): Promise<void> {
        const query =  `DELETE FROM usuarios
                        WHERE id_usuario = $1;`
        const res = await this.pg.query<Usuario>(query, [id])

        if (res.rowCount === 0) throw new PC_BadRequest(`Usuario de id ${id}, no existe. Ignorando`)
        console.log(res)
    }

    async findAll(data: Partial<Usuario>): Promise<Usuario[]> {
        throw new PC_NotImplemented()
    }

    async getFirstBy(data: Partial<Usuario>): Promise<Usuario | undefined> {
        throw new PC_NotImplemented()
    }

    async getUserByCredentials(credenciales: Credenciales): Promise<any> {
        const query = this.#baseQuery + `JOIN credenciales c ON c.id_usuario = u.id_usuario
                                        WHERE u.username = $1 AND c.password_hash = crypt($2, password_hash)
                                        GROUP BY u.id_usuario;`
        const vars = [credenciales.username, credenciales.password]
        const res = await this.pg.query<Usuario>(query, vars)
        
        if (res.rowCount === 0) throw new PC_NotFound(`Usuario no encontrado. Credenciales Incorrectas`)

        return res.rows[0]
    }
}
