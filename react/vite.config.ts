import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: (content: string, filename: string) => {
                    if (
                        filename.includes("utils/") ||
                        filename.includes("functions/") ||
                        filename.includes("mixins/") ||
                        filename.includes("variables/") ||
                        filename.includes("fonts/") ||
                        filename.includes("index/")
                    ) {
                        return content;
                    }

                    return `@use "@/assets/style/base/global.scss" as *;
          \n
          ${content}
          `;
                },
            },
        },
    },
    server: {
        open: true,
        proxy: {
            "/api": {
                target: "https://blog-pet-seven.vercel.app/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET,POST,PUT,PATCH,DELETE,OPTIONS",
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
