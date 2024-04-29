import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";

import viteCompression from 'vite-plugin-compression';
import svgrPlugin from 'vite-plugin-svgr';

dotenv.config();

export default defineConfig({
  server: {
    port: 3001,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 3001,
  },
  plugins: [react(), tsconfigPaths(), svgrPlugin(), viteCompression()],
  define: {
    "process.env": process.env,
  },
  build: {
    minify: 'terser',
  },
});
