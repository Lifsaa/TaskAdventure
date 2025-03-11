import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target:
          "https://taskadventure-d4eqd3hefccfhmdp.westus-01.azurewebsites.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
