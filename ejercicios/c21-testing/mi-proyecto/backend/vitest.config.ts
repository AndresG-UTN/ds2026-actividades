import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    env: {
      JWT_SECRET: "secreto-temporal-para-tests",
    },
  },
});