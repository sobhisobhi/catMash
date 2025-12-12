import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    // IMPORTANT: Exclure les tests E2E
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/tests/e2e/**', // ← AJOUTER CETTE LIGNE
      '**/playwright-report/**',
      '**/test-results/**',
    ],
    include: [
      '**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.config.*',
        '**/__tests__/**',
        '**/tests/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/index.ts', // Fichiers d'export seulement
        '**/*.d.ts',
        '**/*.scss', // Exclure les fichiers SCSS
        '**/*.css',
        '**/src/app/**', // Exclure les pages Next.js (testées en E2E)
      ],
      include: [
        'src/**/*.{ts,tsx}',
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});