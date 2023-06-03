import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compress from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), compress()],
    build: {
        minify: true,
        brotliSize: true,
        analyze: true
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
                keepAlive: true
            }
        }
    }
});
