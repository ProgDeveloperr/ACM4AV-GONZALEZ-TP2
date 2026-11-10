# 3D Store — Gestor de Productos 3D

Aplicación web desarrollada con **React + Vite** para la gestión y visualización de un catálogo de productos fabricados mediante impresión 3D.

El proyecto fue realizado como **Trabajo Práctico 2 de Plataformas de Desarrollo** y combina un catálogo público con un panel administrativo protegido por autenticación y roles.

La aplicación incluye catálogo, búsqueda dinámica, detalle de productos, CRUD completo, autenticación simulada, persistencia de sesión, rutas protegidas, notificaciones y diseño responsive.

---

## Características principales

### Catálogo de productos

- Visualización de productos mediante componentes reutilizables.
- Fotografías reales optimizadas en formato AVIF.
- Información de:
  - nombre;
  - descripción;
  - precio;
  - categoría;
  - stock;
  - material;
  - personalización;
  - imagen.
- Vista individual de cada producto.
- Manejo de productos inexistentes.

### Búsqueda dinámica

El catálogo permite buscar productos por nombre en tiempo real.

La búsqueda se actualiza sin recargar la página y muestra un estado específico cuando no existen coincidencias.

### CRUD completo

Desde el panel administrativo se pueden realizar las cuatro operaciones principales:

- **Create:** crear productos.
- **Read:** visualizar productos.
- **Update:** editar productos existentes.
- **Delete:** eliminar productos.

Los datos se gestionan mediante una API REST provisional creada con **JSON Server**.

Endpoint principal:

```text
http://localhost:3000/products
```

### Confirmación de eliminación

Antes de eliminar un producto se muestra un modal de confirmación para evitar eliminaciones accidentales.

### Notificaciones

Las operaciones relevantes muestran notificaciones mediante **React Toastify**, incluyendo:

- inicio de sesión;
- errores de autenticación;
- creación de productos;
- actualización;
- eliminación;
- cierre de sesión;
- errores de conexión o procesamiento.

---

## Autenticación y roles

La aplicación utiliza **React Context** para manejar el estado global de autenticación.

Existen dos roles:

### Administrador

Puede:

- acceder al catálogo;
- visualizar detalles;
- acceder al panel `/admin`;
- crear productos;
- editar productos;
- eliminar productos.

### Usuario

Puede:

- acceder al catálogo;
- utilizar el buscador;
- visualizar detalles de productos.

No puede ingresar al panel administrativo.

Si intenta acceder directamente a `/admin`, es redirigido a una pantalla de **acceso denegado (403)**.

> La autenticación es simulada con fines académicos y no representa un sistema de autenticación productivo.

---

## Credenciales de demostración

### Administrador

```text
Usuario: admin
Contraseña: 1234
```

### Usuario

```text
Usuario: user
Contraseña: 1234
```

---

## Persistencia de sesión

La sesión autenticada se conserva mediante `localStorage`.

La aplicación almacena únicamente información básica de sesión:

- id;
- username;
- email;
- rol.

La contraseña **no se almacena en LocalStorage**.

Al cerrar sesión, la información persistida es eliminada.

---

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/productos` | Catálogo completo |
| `/productos/:id` | Detalle de un producto |
| `/login` | Inicio de sesión |
| `/admin` | Administración de productos |
| `/acceso-denegado` | Pantalla de acceso restringido |

La ruta `/admin` se encuentra protegida y requiere una sesión con rol `admin`.

---

## Tecnologías utilizadas

### Frontend

- React 19
- Vite
- React Router DOM
- React Toastify
- JavaScript
- CSS

### Backend provisional

- JSON Server
- REST API
- archivo `db.json`

### Herramientas

- Node.js
- npm
- ESLint
- Git

---

## Arquitectura

El proyecto utiliza una estructura basada en componentes, páginas, hooks, contexto global y estilos separados por responsabilidad.

```text
src/
├── components/
│   ├── Footer/
│   ├── Modal/
│   ├── Navbar/
│   ├── ProductCard/
│   ├── ProductForm/
│   └── ProtectedRoute/
│
├── context/
│   ├── auth-context.js
│   └── AuthProvider.jsx
│
├── hooks/
│   ├── useAuth.js
│   └── useProducts.js
│
├── pages/
│   ├── AccessDenied.jsx
│   ├── Admin.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ProductDetail.jsx
│   └── Products.jsx
│
├── styles/
│   ├── globals.css
│   ├── primitives.css
│   └── tokens.css
│
├── App.jsx
├── index.css
└── main.jsx
```

Los componentes y páginas principales poseen sus propios archivos CSS para evitar concentrar todos los estilos en una única hoja global.

---

## Hooks personalizados

### `useProducts`

Centraliza la carga del catálogo y administra:

- datos;
- estado de carga;
- errores;
- actualización del estado local de productos.

### `useAuth`

Permite consumir de forma controlada el contexto de autenticación dentro de los componentes de la aplicación.

---

## Componentes principales

### Navbar

Navegación general de la aplicación.

Adapta sus opciones según el estado de autenticación y el rol del usuario.

### ProductCard

Representa cada producto dentro del catálogo.

### ProductForm

Formulario reutilizable utilizado tanto para crear como para editar productos.

### Modal

Componente utilizado para confirmar la eliminación de productos.

### Footer

Pie de página general del sitio.

### ProtectedRoute

Protege rutas según:

- existencia de sesión;
- rol autorizado.

---

## Base de datos

Los datos de desarrollo se encuentran en:

```text
db.json
```

El proyecto contiene **10 productos iniciales**.

Cada producto posee una estructura similar a:

```json
{
  "id": 1,
  "name": "Soporte para Celular",
  "description": "Descripción del producto",
  "price": 8500,
  "category": "Escritorio",
  "stock": 10,
  "image": "/images/products/soporte-celular.avif",
  "material": "PLA",
  "customizable": true
}
```

---

## Instalación

### Requisitos

Es necesario tener instalados:

- Node.js
- npm

Comprobar versiones:

```bash
node --version
npm --version
```

### Instalar dependencias

Desde la carpeta raíz del proyecto:

```bash
npm install
```

---

## Ejecutar el proyecto

La aplicación utiliza dos procesos: el frontend y el backend provisional.

### Terminal 1 — JSON Server

```bash
npm run server
```

La API quedará disponible en:

```text
http://localhost:3000
```

Productos:

```text
http://localhost:3000/products
```

### Terminal 2 — React + Vite

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

---

## Scripts disponibles

| Comando | Función |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run server` | Inicia JSON Server en el puerto 3000 |
| `npm run lint` | Ejecuta ESLint |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build de producción |

---

## Validación del proyecto

Antes de la entrega se verificaron:

- renderizado de los 10 productos;
- imágenes del catálogo;
- búsqueda dinámica;
- detalle de producto;
- manejo de producto inexistente;
- creación de productos;
- edición;
- eliminación;
- modal de confirmación;
- Toast notifications;
- inicio y cierre de sesión;
- persistencia mediante LocalStorage;
- rol `user`;
- rol `admin`;
- protección directa de `/admin`;
- pantalla de acceso denegado;
- diseño responsive;
- ausencia de errores de lint;
- build de producción correcto.

Comandos utilizados para la validación técnica:

```bash
npm run lint
npm run build
```

---

## Diseño responsive

La interfaz fue diseñada para adaptarse a diferentes tamaños de pantalla:

- escritorio;
- notebook;
- tablet;
- dispositivos móviles.

El sistema utiliza un conjunto centralizado de variables visuales y estilos globales dentro de `src/styles`.

---

## Objetivo académico

El proyecto aplica conceptos fundamentales del desarrollo de aplicaciones React:

- componentes reutilizables;
- props;
- renderizado mediante `map`;
- `useState`;
- `useEffect`;
- custom hooks;
- React Router;
- rutas dinámicas;
- Context API;
- autenticación;
- roles;
- rutas protegidas;
- LocalStorage;
- formularios;
- consumo de API REST;
- CRUD;
- feedback visual;
- responsive design.

---

## Estado del proyecto

```text
Estado: Finalizado
Frontend: React + Vite
Backend provisional: JSON Server
Productos iniciales: 10
CRUD: Completo
Autenticación: Implementada
Roles: admin / user
Responsive: Sí
Lint: PASS
Build: PASS
```