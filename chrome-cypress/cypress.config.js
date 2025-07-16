const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.js',
    supportFile: false,
    baseUrl: 'http://localhost:5173',
  },
});
