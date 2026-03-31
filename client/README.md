## 🥯 GlutenFree Market - Frontend
¡Bienvenido al repositorio del Frontend de GlutenFree Market! Esta es una aplicación de comercio electrónico diseñada para personas que buscan productos certificados sin gluten, ofreciendo una experiencia de usuario fluida, segura y reactiva.

## 🚀 Tecnologías Utilizadas
El proyecto fue construido utilizando un stack moderno para garantizar escalabilidad y rendimiento:

React.js: Biblioteca principal para la interfaz de usuario.

Vite: Herramienta de construcción para un desarrollo ultra rápido.

React Router Dom: Gestión de navegación y rutas protegidas.

Context API: Manejo de estado global (Carrito de compras, Autenticación).

Axios: Cliente HTTP para el consumo de la API REST.

SweetAlert2: Notificaciones interactivas y elegantes para el usuario.

CSS / Bootstrap: Estilizado responsivo y moderno.

## 🛠️ Características Principales
Gestión de Carrito: Persistencia de datos mediante localStorage para evitar pérdida de productos al recargar.

Autenticación: Sistema de Login y Registro vinculado al Backend.

Rutas Protegidas: Acceso restringido a secciones de usuario (Perfil, Historial de pedidos).

Sincronización con Backend: Integración completa con API REST para la gestión de productos y pedidos.

Diseño Responsivo: Adaptable a dispositivos móviles y escritorio.

## 📦 Instalación y Configuración
Sigue estos pasos para levantar el proyecto en tu entorno local:

1- Clona el repositorio:
git clone https://github.com/tu-usuario/GlutenFree-Market.git

2- Entra a la carpeta del cliente:
cd client

3- Instala las dependencias:
npm install

4- Configura las variables de entorno:
Crea un archivo .env en la raíz de la carpeta client y añade la URL de tu backend:

API_URL=http://localhost:3000

5- Inicia el servidor de desarrollo:
npm run dev

## 📂 Estructura de Carpetas

client/
├── src/
│   ├── components/  # Componentes reutilizables (Navbar, Cards, Footer)
│   ├── context/     # Proveedores de estado global (CartContext, UserContext)
│   ├── views/       # Páginas principales (Home, Checkout, Login)
│   ├── assets/      # Imágenes y estilos globales
│   └── App.jsx      # Configuración de rutas
└── .env             # Configuración de API


