import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8100",
    viewportWidth: 414,
    viewportHeight: 896,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
