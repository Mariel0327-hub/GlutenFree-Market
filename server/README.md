Por acabar


tests ->
falta colocar tests en order y cart


En proceso



//manejo de errores ( de momento controlados vía console.error() - dev)
-> middlewares, códigos de erorres (DB), otros middleware.

- 404, not found  /// practicamente acabado (revisar!!!!!!!!!!!!)
- already exists //login (agregar constratints unique a correo y otras credenciales)
- not authorized // ya implmementadas en middleware de autenticación (partially done)

- db mistakes // en lib db, importar en catch!!!!!!!!!!!!!

- wrong request, etc...//// revisar!!!!!!!!!!!!!!!!!!!
- ## Add to controllers

Por comenzar

// dependencias para creación de id (nanoid, uui)


// 



////////En próximas versiones, podría exisir una tabal admins, users, employees (o algo similar) para crear otros roles con menos privilegios que admin pero con más que los clientes, para gestionar la aplicación en la medida que esta vaya creciendo