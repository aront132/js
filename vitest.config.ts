import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'lcov'],
    },
    include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx', 'src/**/__tests__/**/*.ts'],
  },
});
