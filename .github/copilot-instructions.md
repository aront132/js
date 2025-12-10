<!-- Generated guidance for AI coding agents working on this repo -->
# Copilot / AI agent instructions — GameVault (proyecto_js)

This file gives focused, repo-specific guidance so an AI coding agent can be immediately productive.

**Quick Commands**:
- `npm install` : install deps
- `npm run server` : start mock API (json-server) on `http://localhost:4001` (serves `db.json`)
- `npm run dev` : start Vite dev server for the React app
- `npm test` : run unit tests (Vitest)
- `npm run build` : type-check (`tsc`) + `vite build`

**Big-picture architecture**:
- Layered structure under `src/`:
  - `domain/` — domain models and types (single-source-of-truth for entities, e.g. `src/domain/juegos/Juego.ts`).
  - `infrastructure/` — HTTP clients and repositories that talk to the API (`src/infrastructure/api/apiClient.ts`, `src/infrastructure/repositories/*Repository.ts`).
  - `application/` — thin service adapters and helpers (some use `fetch` directly, see `src/application/services/authService.ts`).
  - `usecases/` — business logic orchestrations (e.g. `src/usecases/orders/createOrder.ts`).
  - `presentation/` + `pages/` + `components/` — React UI layer and hooks.

**Data flow and integration points**:
- UI -> hooks/components -> (application services | usecases) -> repositories -> `apiClient` -> json-server API.
- `apiClient` (Axios instance) is at `src/infrastructure/api/apiClient.ts`. Use this for new HTTP integrations to benefit from consistent headers, timeout and response/error interceptors.
- Base URL is defined in `src/infrastructure/api/api.ts` (`http://localhost:4001`) and `db.json` is the data source for the mock API.

**Conventions & patterns to follow**:
- Prefer `infrastructure/repositories/*` for HTTP calls when adding features. Repositories return domain-typed objects (e.g. `Promise<Juego[]>`). Example: `src/infrastructure/repositories/juegosRepository.ts`.
- `application/services/*` contains older adapters that use `fetch` directly — avoid duplicating behavior: prefer repositories for new code, or update the service and repository together if you must change transport.
- Domain models live in `src/domain/*`. Use these types for function signatures and returns.
- Spanish identifiers and comments are common (e.g. `crear`, `obtenerTodos`, `usuarioId`). Keep naming consistent with existing files unless migrating to English is an explicit task.
- Error handling: `apiClient` intercepts responses and converts API error payloads to thrown `Error(message)`. When calling repositories, handle `throw`/`catch` accordingly.

**Patterns & examples**:
- Creating an order: `src/usecases/orders/createOrder.ts`:
  - Creates a `Pedido` via `PedidosRepository.crear`, then creates details via `DetallePedidosRepository.crear`, and updates stock via `JuegosRepository.actualizar` (non-fatal failure logged with `console.warn`).
- Auth: two code paths exist — `src/application/services/authService.ts` (uses `fetch`) and `src/infrastructure/repositories/authRepository.ts` (uses `apiClient`). Prefer the repository for centralized HTTP behaviour.

**Tests & CI guidance**:
- Unit tests use `vitest` (see `vitest.config.ts`). Run locally with `npm test`.
- Tests are colocated under `src/usecases/.../__tests__` for business logic tests (example: `src/usecases/orders/__tests__/cancelOrder.spec.ts`).

**Developer notes / gotchas**:
- The mock API (`json-server`) runs on port `4001`; ensure it is running before integration work or tests that hit the API.
- Some modules still use `fetch` and some use the `apiClient` (Axios). Do not introduce a third HTTP approach — standardize on `apiClient` when touching multiple files.
- Keep payload shapes aligned with `db.json` and domain models. Inspect `db.json` when unsure about sample data shape.

**Where to look first when changing behavior**:
- `src/infrastructure/api/apiClient.ts` — central axios config and error parsing
- `src/infrastructure/repositories/*Repository.ts` — repository functions for CRUD and API shapes
- `src/usecases/*` — business logic that composes repositories (good for unit tests)
- `src/domain/*` — canonical types to reuse

If anything is unclear or you'd like more detail (example: I can extract `db.json` schema, list all routes used by repos, or convert `application/services` to repos), tell me which area to expand.

<!-- End of file -->
