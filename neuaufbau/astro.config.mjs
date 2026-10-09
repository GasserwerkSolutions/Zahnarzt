import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://zahnaerztehaus-arch.ch",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
});
