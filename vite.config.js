import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Force all React imports to resolve to the same single copy.
      // This fixes "Cannot read properties of null (reading 'useState')"
      // which occurs when @react-three/fiber and @react-three/drei
      // bundle their own copies of React, causing hooks to fail.
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "react/jsx-runtime": path.resolve("./node_modules/react/jsx-runtime"),
      "react/jsx-dev-runtime": path.resolve("./node_modules/react/jsx-dev-runtime"),
      // Also dedupe three.js to avoid multiple instances
      three: path.resolve("./node_modules/three"),
    },
    dedupe: ["react", "react-dom", "three", "@react-three/fiber", "@react-three/drei"],
  },
  optimizeDeps: {
    // Pre-bundle these dependencies to ensure single instance resolution
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "framer-motion",
    ],
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
