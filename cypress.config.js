const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Ensures Cypress tests frontend properly
    env: {
      apiUrl: "http://localhost:5001/api", // Correct backend API URL
    },
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
});
