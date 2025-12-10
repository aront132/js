


1. 📂 src/domain/ (La Capa de Dominio)

carrito/: Define qué es un ítem del carrito (CarritoItem.ts) y la estructura del carrito (Carrito.ts).

juegos/: Define la entidad Juego (título, precio, stock, etc.).

pagos/: Define los tipos para procesar pagos (MetodoPago, ComprobantePago, EstadoPago).

pedidos/: Define qué es un Pedido, un DetallePedido y los estados posibles (pendiente, pagado, etc.).

usuarios/: Define la entidad Usuario y sus roles (admin/cliente).

shared/: Contiene utilidades compartidas o "Value Objects" que usabas antes (aunque ahora simplificamos a tipos primitivos), como errores de dominio (DomainError) y validaciones (ValidacionUtils).

2. 📂 src/application/ (La Capa de Aplicación)
Aquí está la lógica de "lo que la aplicación hace". Conecta la vista con los datos.

usecases/ (Casos de Uso): Son las acciones concretas del usuario. Ejemplos: createOrder (crear pedido y actualizar stock), cancelOrder (cancelar pedido), login (iniciar sesión).

services/: Servicios que agrupan lógica o llaman a los repositorios. Por ejemplo, authService maneja el login y registro.

validators/: Esquemas de validación usando Zod. Aquí defines las reglas de tus formularios (ej: que la contraseña tenga 6 caracteres en registroSchema, o que el precio sea positivo en juegoSchema).

mappers/: Funciones para transformar los datos que vienen "sucios" de la API a tus objetos "limpios" del dominio (toDomain) y viceversa (toDTO).

3. 📂 src/infrastructure/ (La Capa de Infraestructura)
Aquí es donde tu app "habla" con el mundo exterior (API, Base de datos).

api/: Configuración de Axios (apiClient.ts). Aquí se define la URL base (localhost:3000) y se configuran interceptores para errores.

repositories/: Son los encargados de hacer las peticiones HTTP (GET, POST, PUT, DELETE). Por ejemplo, juegosRepository.ts tiene los métodos para obtener todos los juegos, crear uno nuevo o eliminarlo. La aplicación nunca llama a la API directamente, siempre usa un repositorio.

4. 📂 src/presentation/ (La Capa de Presentación)
Aquí vive todo lo visual (React, HTML, CSS). Es lo que el usuario ve.

components/: Piezas reutilizables de la interfaz.

Card: Contenedor estilo cristal/neón para el contenido.

Modal: Ventanas emergentes para formularios.

Nav: La barra de navegación superior.

Footer: El pie de página con redes sociales.

ProductoCard: La tarjeta individual de cada juego en el catálogo.

layouts/: Plantillas maestras que envuelven las páginas.

MainLayout: Contiene el fondo de estrellas, el Nav y el Footer.

AdminLayout y PerfilLayout: Estructuras con menú lateral para las zonas privadas.

pages/: Las vistas completas de la aplicación.

Admin/: Páginas del administrador (AdminProductosPage).

Auth/: Páginas de Login y Registro.

Cliente/: Páginas del usuario (CarritoPage, HistorialPage, PerfilPage).

Producto/: Catálogo (ProductosPage) y detalle (ProductoDetallePage).

Home/ y Nosotros/: Páginas informativas.

hooks/: Lógica de React reutilizable (Custom Hooks).

useAuth: Maneja el usuario logueado y la sesión.

useCarrito: Maneja el estado global del carrito de compras.

5. 📂 src/assets/
Archivos estáticos como imágenes (img/Producto/*.jpg), logos e iconos.

6. Archivos de Configuración (Raíz)
db.json: Tu base de datos simulada para json-server.

App.tsx: El componente principal que define las rutas (Routing).

main.tsx: Punto de entrada donde se monta React y se importan los estilos globales.

App.css / index.css: Estilos globales, variables de colores, animaciones de estrellas y efectos neón/glassmorphism.

Instalacion:
npm install 
npm install multer cors express
npm install zod@3.22.4
npm install json-server@0.17.4 multer

ejecucion de la base de datos:
npm run server

ejecucion de la paguina: 
npm run dev

PARA ENTRAR EN MODO ADMIN:
correo: admin@gamevault.com  
cotraseña: 123456

para creas cuenta como cliente poner contraseña de 6 digitos:
cuenta de prueba:
cliente@gamevault.com  
123456
