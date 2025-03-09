import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Change if needed
    proxy: {
      "/api": {
        target: "https://taskadventure-d4eqd3hefccfhmdp.westus-01.azurewebsites.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
