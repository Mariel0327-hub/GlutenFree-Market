# Project Features

## 1. Descripción del proyecto

GlutenFree Market es una aplicación web de comercio electrónico enfocada en la venta de productos sin gluten.

La plataforma permite a los usuarios registrarse, iniciar sesión, explorar un catálogo de productos, ver el detalle de cada producto y gestionar un carrito de compras para realizar pedidos.

El objetivo del proyecto es ofrecer una experiencia de compra simple y segura para personas que buscan productos sin gluten en una plataforma centralizada.

---

# 2. Descripción del problema

Actualmente, las personas con enfermedad celíaca o intolerancia al gluten enfrentan dificultades para encontrar productos confiables y certificados sin gluten en un solo lugar.

En muchas ocasiones deben revisar múltiples tiendas o supermercados para encontrar alimentos adecuados, lo que vuelve el proceso de compra lento y poco práctico.

Además, no todas las tiendas online clasifican claramente los productos según su composición o certificación, lo que puede generar confusión y riesgo para quienes deben seguir una dieta estricta libre de gluten.

Debido a esta problemática, surge la necesidad de contar con una plataforma digital especializada que permita centralizar la búsqueda y compra de productos sin gluten de forma simple, clara y segura.

---

# 3. Propuesta de solución

La solución propuesta consiste en el desarrollo de una aplicación web de comercio electrónico llamada **GlutenFree Market**, enfocada exclusivamente en la venta de productos sin gluten.

Esta plataforma permite a los usuarios:

- registrarse
- iniciar sesión
- explorar productos
- agregar productos al carrito
- generar pedidos

La aplicación busca ofrecer una experiencia de usuario sencilla, intuitiva y organizada.

---

# 4. Público objetivo

El público objetivo está compuesto por:

- personas con enfermedad celíaca
- personas con intolerancia al gluten
- consumidores que siguen dietas sin gluten por salud o estilo de vida
- familiares que compran productos para personas con estas condiciones

---

# 5. Estilo visual de la aplicación

El diseño de la aplicación tiene un estilo moderno, limpio y minimalista.

Colores utilizados:

- blanco
- verde suave
- tonos neutros

La interfaz utiliza tarjetas de productos y una navegación clara para facilitar la experiencia de compra.

---

# 6. Vistas de la aplicación

Según el flujo de navegación del proyecto, la aplicación contiene vistas públicas y privadas.

## Vistas públicas

- Home
- Catálogo de productos
- Detalle de producto
- Login
- Register

## Vistas privadas

- Perfil
- Carrito
- Mis pedidos
- Favoritos
- Crear publicación
- Mis publicaciones

---

# 7. Navegación de la aplicación

Flujo general de navegación:

### Usuario no autenticado

Página principal  
→ Home  
→ Catálogo  
→ Detalle de producto  

También puede acceder a:

→ Register  
→ Login  

El usuario invitado puede visualizar productos y acceder al carrito.

### Usuario autenticado

Luego del login el usuario accede a:

Página principal privada

Desde allí puede navegar a:

- Perfil
- Carrito
- Mis pedidos
- Favoritos
- Crear publicación
- Mis publicaciones

---

# 8. Modelo de base de datos

El sistema utiliza una base de datos relacional en PostgreSQL con las siguientes tablas.

## users

- id
- name
- email
- password
- created_at

## products

- id
- title
- description
- price
- category
- image_url
- stock
- user_id
- created_at

## cart_items

Tabla que almacena los productos agregados al carrito.

- id
- user_id
- product_id
- quantity_per_item

## orders

Tabla que almacena los pedidos realizados por los usuarios.

- id
- user_id
- total
- status
- created_at

## order_items

Tabla que almacena el detalle de cada producto incluido en un pedido.

- id
- order_id
- product_id
- quantity
- unit_price

---

# 9. Categorías de productos

Los productos se organizan en categorías como:

- panadería sin gluten
- pastas sin gluten
- snacks sin gluten
- harinas alternativas
- cereales sin gluten
- repostería sin gluten

---

# 10. API REST

La aplicación utiliza una API REST para gestionar los recursos del sistema.

## Auth

POST /register
POST /login
GET /profile

## Products

GET /products
GET /products/:id

POST /products        
PUT /products/:id     
DELETE /products/:id  

## Categories

GET /categories

## Cart

GET /cart
GET /cart/:id
POST /cart
PUT /cart/:id
DELETE /cart/:id

## Orders

GET /orders
GET /orders/:id
POST /orders         
PUT /orders/:id       

## Reviews

GET /reviews
GET /reviews/:id
GET /users/:id/reviews
GET /products/:id/reviews

POST /reviews
PUT /reviews/:id
DELETE /reviews/:id

# 11. Tecnologías utilizadas

## Frontend

- React
- React Router
- Axios
- Bootstrap
- Context API

## Backend

- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt
- CORS
- Nodemon

## Testing

- Jest
- Supertest

---

# 12. Funcionalidades principales

### Registro de usuarios

Los usuarios pueden crear una cuenta mediante el endpoint `/register`.

### Inicio de sesión

Autenticación mediante JWT utilizando `/login`.

### Catálogo de productos

Los usuarios pueden explorar todos los productos disponibles mediante `/products`.

### Detalle de producto

Cada producto tiene una vista con información completa accesible mediante `/products/:id`.

### Carrito de compras

El usuario puede:

- agregar productos
- modificar cantidades
- eliminar productos

utilizando los endpoints `/cart`.

### Gestión de pedidos

El usuario puede generar pedidos utilizando `/orders`.

### Perfil de usuario

Los usuarios autenticados pueden acceder a su perfil mediante `/profile`.

---

# 13. Seguridad

La aplicación implementa las siguientes medidas de seguridad:

- contraseñas encriptadas con bcrypt
- autenticación mediante JWT
- rutas privadas protegidas mediante token
- variables de entorno gestionadas con dotenv

---

# 14. Arquitectura del sistema

## Frontend

Aplicación SPA desarrollada en React que consume la API REST.

## Backend

Servidor desarrollado en Node.js y Express encargado de:

- autenticación
- gestión de productos
- gestión de carrito
- generación de pedidos

## Base de datos

PostgreSQL para almacenamiento relacional de datos.

---

# 15. Conclusión

GlutenFree Market es una plataforma de comercio electrónico que permite centralizar la compra de productos sin gluten.

El proyecto integra desarrollo frontend con React, backend con Node.js y Express, autenticación con JWT y gestión de datos con PostgreSQL, aplicando los conocimientos adquiridos durante el curso.
