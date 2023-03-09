const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const deepmerge = require("deepmerge");
      const path = require("path");
      const fs = require("fs");
      // Load the Config File
      function loadconfig(filename) {
        const configJson = require(filename);
        if (configJson.extends) {
          const baseConfigFileName = path.join(
            path.dirname(filename),
            configJson.extends
          );
          const baseConfig = loadconfig(baseConfigFileName);
          return deepmerge(baseConfig, configJson);
        } else {
          return configJson;
        }
      }


      module.exports = (on, config) => {
        on("task", {
          readFiles(folderName) {
            return new Promise((resolve, reject) => {
              fs.readdir(folderName, (err, files) => {
                if (err) {
                  return reject(err);
                }
                resolve(files);
              });
            });
          },
        });
        return loadconfig(config.config);
      };
    },
    env: {
      
    },
    baseUrl: "https://staging.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg",
    reqesUrl: "https://reqres.in/"
  },
});
