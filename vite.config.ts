import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Weather",
        short_name: "Weather",
        start_url: "/",
        display: "standalone",
        theme_color: "#052f4a",
        background_color: "#052f4a",
        description:
          "An app to see weather info based on your location or entered city",
        icons: [
          {
            src: "/app-icons/icon-48.svg",
            sizes: "48x48",
            type: "image/svg+xml",
          },
          {
            src: "/app-icons/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        globDirectory: "./dist/",
        globPatterns: ["**/*.{js,css,html,svg}"],
      },
    }),
  ],
});
