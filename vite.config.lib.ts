import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    dts({
      include: ["src"],
      exclude: ["src/App.tsx", "src/main.tsx"],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NepaliDatePicker",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs.js"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "styles.css";
          return assetInfo.name || "";
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
