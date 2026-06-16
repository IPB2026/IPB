import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Tests = logique pure (helpers, validations, dérivation de dossier). Environnement
// `node`, aucune dépendance UI : la suite tourne avec la seule dépendance `vitest`.
// (Pour de futurs tests de composants React, réintroduire jsdom + @vitejs/plugin-react.)
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['lib/**/*.test.ts', 'app/**/*.test.ts'],
  },
});
