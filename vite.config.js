import { fileURLToPath, URL } from "node:url";
import autoprefixer from "autoprefixer";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_keyframes.scss";
          @import "@/assets/styles/_fonts.scss";
          @import "@/assets/styles/_global.scss";
        `,
      },
    },
  },
});
