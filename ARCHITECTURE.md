# Arquitectura del proyecto

Resumen rápido
- Tipo de proyecto: React + TypeScript + Vite
- Objetivo: tienda de juegos (frontend) con un mock API (json-server) usado en desarrollo

Estructura de carpetas relevante
- `src/` - código fuente
  - `components/` - componentes UI reutilizables
  - `pages/` - páginas por ruta (Home, Productos, Cliente, Admin, etc.)
  - `layouts/` - layout compartidos (Nav, Footer, wrappers)
  - `hooks/` - hooks de React (ej.: `useAuth`, `useCarrito`)
  - `services/` - adaptadores o fachada para la capa de datos (mantienen compatibilidad con código existente)
  - `repositories/` - capa que encapsula llamadas HTTP usando `apiClient` (ideal para tests y DI)
  - `usecases/` - lógica de negocio (casos de uso) que usan repositories
  - `types/` - definiciones TypeScript (Juego, Pedido, DetallePedido, Usuario, etc.)

Patrón y razones
- Separación en capas: UI -> use-cases -> repositories -> apiClient
  - UI (componentes/páginas) consume use-cases o services.
  - Use-cases: contienen la lógica del negocio (ej.: `createOrder`, `cancelOrder`). Son fáciles de testear.
  - Repositories: realizan llamadas HTTP a la API (usan `apiClient` con axios). Permiten mockear en tests.
  - `apiClient`: instancia axios centralizada con interceptores y manejo consistente de errores/headers.

Cómo añadir nueva llamada a la API (pasos recomendados)
1. Añadir método en `src/repositories/<entidad>Repository.ts` usando `apiClient`.
2. Si procede, crear/actualizar un `usecase` en `src/usecases/` que llame al repository y coordine acciones (p. ej. crear pedido + detalles + actualizar stock).
3. Llamar al `usecase` desde el componente o un hook (no desde el repository directamente) para mantener la separación.

Testing
- Tests unitarios: usar Vitest (configurado). Probar use-cases y repositories por separado con mocks.
- Tests de componentes: usar `@testing-library/react` si se requiere.

Ejecución y desarrollo
- Levantar el mock API (json-server): `npm run server` (usa el puerto 4001 por defecto).
- Levantar la app: `npm run dev`
- Tests: `npm test`

Convenciones y estilo
- Tipos en `src/types` y preferir objetos tipados en todas las capas.
- No acceder a `localStorage` directamente desde use-cases; encapsularlo en hooks o servicios de persistencia si es necesario.
- Los use-cases deben ser referenciales (sin efectos secundarios globales) salvo que sea necesario (p. ej. enviar eventos de analytics via inyección).

Próximos pasos recomendados
- Migrar formularios críticos a `react-hook-form + zod` (Registro, Checkout, ProductoForm).
- Añadir ESLint/Prettier y hooks pre-commit (husky + lint-staged).
- Añadir más tests (repositorios y integration tests para use-cases importantes).

Referencias
- `src/usecases/` (ejemplos: `createOrder`, `cancelOrder`)
- `src/repositories/` (ejemplos: `juegosRepository`, `pedidosRepository`, `detallePedidosRepository`)
