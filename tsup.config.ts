import { defineConfig } from 'tsup';

export default defineConfig({
  outDir: 'dist',
  loader: {
    '.html': 'copy',
  },
  clean: true,
});
