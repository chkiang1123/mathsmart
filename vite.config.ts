import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ command }) => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      ...(command === 'build' ? [viteSingleFile()] : []),
      {
        name: 'serve-offline-index',
        configureServer(server) {
          server.middlewares.use('/offline-index.html', (_req, res, next) => {
            const distHtml = path.resolve(__dirname, 'dist/index.html');
            if (fs.existsSync(distHtml)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.setHeader('Content-Disposition', 'attachment; filename="index.html"');
              res.end(fs.readFileSync(distHtml));
              return;
            }
            next();
          });
        },
      },
      {
        name: 'sync-github-pages-docs',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }

          const distHtml = path.resolve(distDir, 'index.html');
          const docsDir = path.resolve(__dirname, 'docs');
          if (fs.existsSync(distHtml)) {
            fs.mkdirSync(docsDir, { recursive: true });
            fs.copyFileSync(distHtml, path.resolve(docsDir, 'index.html'));
            fs.writeFileSync(path.resolve(docsDir, '.nojekyll'), '');
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      assetsInlineLimit: 100_000_000,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
