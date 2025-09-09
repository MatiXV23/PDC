import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

export const usuarioSchema = Type.Object({
    id_usuario: Type.Number({minimum: 1}),
    username: Type.String(),
    email: Type.String(),
    nombres: Type.String(),
    apellidos: Type.String(),
    edad: Type.Number(),
    sexo: Type.String(),
    foto_url: Type.Optional(Type.String()),
    roles: Type.String()
})

export const queryUsuarioSchema = Type.Object({
    nombre : Type.Optional(Type.String()),
    username : Type.Optional(Type.String()),
    roles: Type.Optional(Type.String()),
})

export const credencialesSchema = Type.Object({
    passwordHash : Type.String({minLength: 2}),
    username : Type.String({minLength: 2})
})


export type Credenciales = Static<typeof credencialesSchema>
export type Usuario = Static<typeof usuarioSchema>

