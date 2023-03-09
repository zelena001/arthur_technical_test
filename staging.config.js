const { defineConfig } = require("cypress");


module.exports = defineConfig({
  env:{
    reqesUrl: "https://reqres.in/",
    ENV: "staging"
  },
  e2e: {
    baseUrl: "https://staging.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg",
    reqesUrl: "https://reqres.in/",
  },
});
