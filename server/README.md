## Gluten-Free-Market: Apartado Backend

API REST para gestionar consultas a la base de datos de un e-commerce.

## Tecnologías Empleadas

- Node.js, express.js, postgreSQL,

## Dependencias

- express: Servidor API.

- pg: Conexión a PostgreSQL.

- pg-format: Formatado y parametrización de consultas.

- jsonwebtoken: Seguridad para las rutas privadas.

- cors: Permisos de conexión.

- dotenv: Seguridad de claves.

- bcryptjs: Encriptación de credenciales de usuario.

- jest: Motor de pruebas.

- supertest: Peticiones simuladas a los endpoints.

- nodemon: Reinicio automático del servidor en desarrollo.

- uuidv7: Generación de id. * (se agrega por decisión grupal)

## Instalación y uso.

Instrucciones des instalación y configuración del proyecto:

1. - Clonar repositorio:

```bash
git clone git@github.com:Mariel0327-hub/GlutenFree-Market.git
```

- (Esta instrucción aplica para la descarga del main de la aplicación,
  que estará funcional dentro de una semana)

2. Instalar dependencias:

```bash
npm install
```

3. Crear la base de datos en el servidor local usando el archivo
   'schema.sql'
   - server-> db -> schema.sql

4. Insertar los datos 'dummy a la base de datos'

5. Para Levantar el servidor:

```bash
npm run dev
```

6. Para Probar tests:

```bash
npm run test:<campo espesífico>

```

- Variedades de test:

```bash
npm run test:auth -> tests de login / registro / perfil
npm run test:cart -> tests de carrito
npm run test:order -> tests ordenes de compra
npm run test:product -> tests de prodcutos
npm run test:review -> tests de reseñas de usuarios

```

7. Esta Versión local tiene variables de ambiente:

Se sugiere al usuario de este repositorio que cree sus propias
variables de ambiente en como lo indica el archivo ".env.example"

## OBSERVACIONES INICIALES

1. REPOSITORIO

- Esta branch de repositorio es una muestra tipo _snapshot_ del backend al momento de la entrega del hito 3, esto debido a que ya se comenzó la implementación con el frontend y la base de datos. Esta interacción ha dejeado en evidencia la existencia de situaciones que requieren de corrección y modificación. Por lo que, para poder realizar una entrega del trabajo dentro del plazo entregado (1 semana), se ha decidido que lo que se haya pactado en los días previos a la entrega, salvo que signifique un cambio simple, quedará comentado en el documento, para posterior corrección en otra rama que integre frontend y base de datos. Esto sucederá durante la próxima semana en el deploy del sitio.

- Por ser un _snapshot_, hay ciertos elementos, detalles de edición y presentación al debe, los que serán completados, mejorados e implementados para estar listos al momento de la entrega final del proyecto.

2. BASE DE DATOS

- En la base de datos local, se han dejado inserts tipo dummy con informaciones simples para experimentar de forma manual. Para usarla se debe acceder a los SELECT del esquema y copiar la información deseada. En caso contrario, hay templates de *payload* de algunas rutas post en los tests de jest.

- Posteriormente, los inserts serán modelados para estar incorporados homogéneamente a la base de datos, tanto de forma local como en su versión *deployed* en NEON.

3. ELIMINADO DE DATOS

- Para efectos prácticos de control de rutas, se trabajará el cliente sin _soft-delete_, esto para mantener un orden mínimo durante la implementación. Para versiones posteriores, para efectos de métrica y seguimiento se podrían implementar métodos de soft delete para datos realcionadoos a clientes que ya no estén registrados en la plataforma.

- Por el contrario los productos si se almacenan y "borran" vía _soft-delete_ para manterner históricos de ordenes en caso de variación de precios.

4. VISUALIZACIÓN DE DATOS

- Algunas rutas de visualización de datos (GET) son redundantes, pero están mayoritariamente para simplificar trabajo de un primer montaje de arquitectura. Está previsto refinar en el momento de la implementación y posteriormente a través de filtros, siempre y cuando esa redundancia sea confirmada en la implementación general con lxs encargadxs de frontend y base de datos.

5. OTRAS OBSERVACIONES:

- Es Importante mencionar que se han agregado algunas tablas y relaciones en concordancia con requerimientos mínimos para cumplir con lo realizado en el hito 2 (front-end). Por ello, las rutas y por lo tanto el contrato api también han sido modificados, lo que será reportado próximamente en un segundo contrato.

- En próximas versiones (en un futuro cercano o no), se podría considerar una tabal de usuarios internos (admins, users, employees,etc.) para crear otros roles con menos privilegios que _admin_ pero con más que los clientes, para gestionar la aplicación en la medida que esta vaya creciendo.


## ABOUT NEON:

1. ID es modificable, se aplicará el ID usado en la apliación vía uiidv7.
