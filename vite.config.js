import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // specify the directory where index.html is located
  base: '/loteria',
  build: {
    outDir: '../docs', // specify the output directory
  },
  server: {
    open: true, // automatically open the app in the browser
  },
});
