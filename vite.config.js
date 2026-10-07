import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

// Content Security Policy for the production build. GitHub Pages cannot set HTTP headers, so it is
// injected as a <meta> tag (only at build time, so the Vite dev server and HMR keep working).
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://api.mapbox.com https://tile.openstreetmap.org https://static.inaturalist.org https://*.googleusercontent.com",
  "media-src 'self'",
  "connect-src 'self' https://farwest-photos.raphaelnussbaumer.com",
  "frame-src https://macaulaylibrary.org https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const cspPlugin = {
  name: "inject-csp",
  apply: "build",
  transformIndexHtml(html) {
    return html.replace(
      "<head>",
      `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`
    );
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cspPlugin],
  base: "/theFarWest/",
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 4 uses Sass features deprecated in Dart Sass; silence noise from dependencies.
        quietDeps: true,
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing libraries into their own chunks for better browser caching.
        manualChunks(id) {
          if (id.includes("node_modules/leaflet") || id.includes("node_modules/vue2-leaflet")) return "leaflet";
          if (id.includes("node_modules/bootstrap-vue") || id.includes("node_modules/vue/")) return "vue";
        },
      },
    },
  },
});
