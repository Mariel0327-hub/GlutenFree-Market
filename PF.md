# Project Features

## Descripción del proyecto

GlutenFree Market es una aplicación web de comercio electrónico enfocada en la venta de productos sin gluten.  
La plataforma permite a los usuarios registrarse, explorar un catálogo de productos, ver el detalle de cada producto y agregar artículos a un carrito de compras.

El objetivo del proyecto es ofrecer una experiencia de compra simple y segura para personas que buscan productos sin gluten.

---

## Funcionalidades principales

### 1. Registro de usuarios

Los usuarios pueden crear una cuenta en la plataforma.

Funciones:
- registro con nombre, email y contraseña
- validación de datos
- almacenamiento seguro de contraseñas

---

### 2. Inicio de sesión

Los usuarios registrados pueden iniciar sesión para acceder a funcionalidades privadas.

Funciones:
- autenticación con JWT
- generación de token de acceso
- protección de rutas privadas

---

### 3. Catálogo de productos

La aplicación permite visualizar un catálogo de productos disponibles.

Funciones:
- listar todos los productos
- mostrar información básica de cada producto
- navegación hacia el detalle del producto

---

### 4. Detalle de producto

Cada producto cuenta con una página de detalle donde se muestra su información completa.

Información mostrada:
- nombre del producto
- descripción
- precio
- categoría
- imagen
- disponibilidad

---

### 5. Carrito de compras

Los usuarios pueden agregar productos al carrito.

Funciones:
- agregar productos al carrito
- modificar cantidad de productos
- eliminar productos del carrito
- visualizar total de compra

---

### 6. Gestión de pedidos

Los usuarios pueden realizar pedidos con los productos seleccionados.

Funciones:
- crear pedido
- guardar pedido en la base de datos
- visualizar historial de pedidos

---

### 7. Perfil de usuario

Los usuarios autenticados pueden acceder a su perfil.

Funciones:
- visualizar información del usuario
- gestionar sesión
- revisar pedidos realizados

---

## Seguridad

La aplicación implementa diferentes medidas de seguridad:

- contraseñas encriptadas con bcrypt
- autenticación mediante JWT
- protección de rutas privadas

---

## Arquitectura del sistema

Frontend:
- React
- React Router
- Context API
- Axios

Backend:
- Node.js
- Express
- PostgreSQL
- JWT
- CORS
