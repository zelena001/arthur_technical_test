const { defineConfig } = require("cypress");


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  env:{
    reqesUrl: "https://reqres.in/",
    ENV: "dev"
  },
  e2e: {
    baseUrl: "https://dev.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg",
    setupNodeEvents(on, config){
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  },
});
