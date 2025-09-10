# API REST - Completa.
![fastify](https://www.weblantropia.com/wp-content/uploads/2016/05/RESTful-API-1-1260x710.jpg)
___
### 🙋 Integrantes 🙋
  -  Agustin Cigaran
  -  Brahian Nuñez
  -  Matias Perez
___
### 📌 PreRequisitos 📌
#### Antes de iniciar con el proyecto es necesario haber logrado:
-  Haber creado una conexión a una base de datos postgres vacía donde conectarse y crear nuestras tablas
___
### 🎯 Objetivos 🎯
#### En este proyecto se buscara:
-  Repasar y aplicar todo lo visto en el curso hasta ahora
-  Usar el plugin @fastify/autoload
-  Conectar nuestra api con una base de datos postgres.
___
### 🔡 Partes del proyecto 🔢
| 1° Autoload | 2° Pseudo DB | 3° Conexion a DB |
|--------------|--------------|--------------|
| Generar un nuevo proyecto fastify usando typescript nativo y ESM | Login con usuario y contraseña | Conexión a la DB de postgres según la diapositiva de Fastify |
| Instalar el plugin @fastify/autload | Obtener todos los usuarios, solo para admins | Crear las tablas según el archivo *init.zip* provisto |
| Registrar y configurar plugin @fastify/autoload para que cargue todas las rutas disponibles en src/routes | Los usuarios no autenticados pueden registrarse | Crear un módulo o servicio que permita ejecutar desde cualquier parte del código: db.query("laquery",[params]) |
| Crear un archivo root.ts en src/routes con una ruta "/" que devuelve { ping : ok } | Modificar usuarios, para admin y usuario propio.Borrar usuarios solo los admins | Actualizar las rutas del usuario en service/repository para que consuma la DB |
| Instalar swagger y swagger ui | Obtener un usuario por su id, puede hacerlo el admin y los usuarios | Nota: los esquemas no necesariamente tienen la misma representación que en las tablas del archivo *init.zip* |
| Configurar autoload para que cargue los plugins de la carpeta src/plugins | Verificar el funcionamiento de las rutas autogeneradas en el swagger | ... |
___
### 📎 Herramienta de gestion del proyecto 📎
#### Click en la imagen para visitar nuestro Jira con la asignación de tareas del proyecto.
[![Accede a jira](https://www.yunbitsoftware.com/blog/wp-content/uploads/2021/02/21430-scaled-e1614339566329.jpg)](https://webdev-cnp.atlassian.net/jira/software/projects/PBF/boards/67)
___
### 📡 Servidor 📡
#### Dentro del proyecto es posible ejecutar el servidor:

 - npm run dev
   - Esto ejecuta el script =>  "dev": "npm install && node --watch server.ts" <= definido dentro del package-json
#### Luego de ejecutar el servidor ya podremos hacerle las peticiones
___
### 👀 Informe/consultas sobre la corrección 👀
-  Antes de tener el swagger junto al equipo estuvimos realizando algunas peticiones y pruebas con el programa 'postman' ya que nos parecio bastante más rápido y practico.
-  Por ahora todo correcto 👍
___
