import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const tsconfigPaths = await import("vite-tsconfig-paths");

  return {
    plugins: [react(), tsconfigPaths.default()],
    build: {
      lib: {
        entry: "src/components/index.ts",
        name: "ReactLibrary",
        fileName: "react-library",
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});
