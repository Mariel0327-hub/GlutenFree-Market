Por acabar


tests ->
Leer descripción en cada grupo de tests.


Por comenzar



//manejo de errores ( de momento controlados vía console.error() - dev)
-> middlewares, códigos de erorres (DB), otros middleware.

- 404, not found  /// practicamente acabado (revisar!!!!!!!!!!!!)
- already exists //login (agregar constratints unique a correo y otras credenciales)
- not authorized // ya implmementadas en middleware de autenticación (partially done)

- db mistakes // en lib db, importar en catch!!!!!!!!!!!!!

- wrong request, etc...//// revisar!!!!!!!!!!!!!!!!!!!
- ## Add controllers


// dependencias para creación de id (nanoid, uui)


// import { uuidv7 } from 'uuidv7';




////////En próximas versiones, podría exisir una tabal admins, users, employees (o algo similar) para crear otros roles con menos privilegios que admin pero con más que los clientes, para gestionar la aplicación en la medida que esta vaya creciendo