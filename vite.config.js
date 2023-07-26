import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // origin: "http://localhost:5173",
      watch: {
        usePolling: true,
        interval: 100,
          ignored: [
            'server.ts',
              ]


      },
      middlewareMode: "ssr"
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "client/main.ts",
    },
  },
});
