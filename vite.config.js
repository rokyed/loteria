import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // specify the directory where index.html is located
  build: {
    outDir: '../dist', // specify the output directory
  },
  server: {
    open: true, // automatically open the app in the browser
  },
});

