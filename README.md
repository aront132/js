# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

---

## Project quick start (GameVault)

Siguientes pasos para ejecutar el proyecto en desarrollo:

1. Instala dependencias:

```powershell
cd 'c:\Users\Aron\OneDrive\Desktop\proyecto_js'
npm install
```

2. Levanta el mock API (json-server) y la app (Vite) en terminales separadas:

```powershell
# json-server (usa puerto 4001)
npm run server

# en otra terminal
npm run dev
```

3. Ejecuta pruebas unitarias:

```powershell
npm test
```

## Arquitectura y guía rápida

Se introdujo una separación por capas para favorecer mantenibilidad y testing:

- `src/repositories/` — capa que encapsula llamadas HTTP (usa `src/services/apiClient.ts`).
- `src/usecases/` — lógica de negocio (ej.: `createOrder`, `cancelOrder`).
- `src/services/` — adaptadores / reexports para compatibilidad con código existente.

Lee `ARCHITECTURE.md` para detalles y pautas de contribución.

