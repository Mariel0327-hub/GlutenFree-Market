// COMENTARIOS RELEVANTES:

## Gluten-Free-Market: Apartado Backend

- OBSERVACIONES INICIALES

1. REPOSITORIO
- Esta branch de repositorio es una muestra tipo *snapshot* del backend al momento de la entrega del hito 3, esto debido a que ya se comenzó la implementación con el frontend y la base de datos. Esta interacción ha dejeado en evidencia la existencia de situaciones que requieren de corrección y modificación. Por lo que, para poder realizar una entrega del trabajo dentro del plazo entregado (1 semana), se ha decidido que lo que se haya pactado en los días previos a la entrega, salvo que signifique un cambio simple, quedará comentado en el documento, para posterior corrección en otra rama que integre frontend y base de datos. Esto sucederá durante la próxima semana en el deploy del sitio.

-  Por ser un *snapshot*, hay ciertos elementos y detalles de edición al debe, los que serán completados, idealemente ante y hasta el momento de la entrega final del proyecto.

2. BASE DE DATOS
- En la base de datos local, se han dejado inserts tipo dummy con informaciones simples para experimentar con la base de datos de forma manual. Para usarla es simplemente acceder a los SELECT del esquema y copiar la información deseada. En caso contrario, hay templates de payload de algunas rutas post en los tests de jest.

- Posteriormente, los inserts serán modelados para estar incorporados homogéneamente a la base de datos. 

- Adicionalmente se puede explorar la conexión con el piloto de la base de datos alojada en la nube. (se requiere descomentar la base de datos online).

- No obstante, se sugiere probar con la base de datos local, que fue la que se usó para desarrollar las rutas. 


3. ELIMINADO DE DATOS
- Para efectos prácticos de control de rutas, se trabajará el cliente sin *soft-delete*, esto para mantener un orden mínimo durante la implementación. Para versiones posteriores, para efectos de métrica y seguimiento se podrían implementar métodos de soft delete para datos realcionadoos a clientes que ya no estén registrados en la plataforma.

- Por el contrario los productos si se almacenan con *soft-delete* para manterner históricos de ordenes en caso de variación de precios.

4. VISUALIZACIÓN DE DATOS
- Algunas rutas de visualización de datos (GET) son redundantes, pero están mayoritariamente para simplificar trabajo de un primer montaje de arquitectura. Está previsto refinar en el momento de la implementación y posteriormente a través de filtros, siempre y cuando esa redundancia sea confirmada en la implementación general con lxs encargadxs de frontend y base de datos.

5. OTRAS OBSERVACIONES:

- Es Importante mencionar que se han agregado algunas tablas y relaciones en concordancia con requerimientos mínimos para cumplir con lo realizado en el hito 2 (front-end). Por ello, las rutas y por lo tanto el contrato api también han sido modificados, lo que será reportado próximamente en un segundo contrato.

- En próximas versiones (en un futuro cercano o no), se podría considerar una tabal de usuarios internos (admins, users, employees,etc.) para crear otros roles con menos privilegios que *admin* pero con más que los clientes, para gestionar la aplicación en la medida que esta vaya creciendo.

