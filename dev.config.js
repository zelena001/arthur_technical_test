const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg",
    reqesUrl: "https://reqres.in/",
  },
});
