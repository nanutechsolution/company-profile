import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "_next/**", "_not-found/**", "404/**", "id/**", "en/**", "images/**", "node_modules/**"]),
]);
