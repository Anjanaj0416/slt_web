const utils = require("./utils");
const fse = require("fs-extra");
``;
Promise.all([
  // fse.copy("../pages", "output/pages"),
  fse.copy("../src", "output/src"),
  fse.copy("../.gitignore", "output/.gitignore"),
  fse.copy("../public", "output/public"),
  fse.copy("../package.json", "output/package.json"),
  fse.copy("../.eslintrc.json", "output/.eslintrc.json"),
  fse.copy("../next-env.d.ts", "output/next-env.d.ts"),
  fse.copy("../next.config.js", "output/next.config.js"),
  // fse.copy("../next-i18next.config.js", "output/next-i18next.config.js"),
  // fse.copy("../.eslintrc.json", "output/.eslintrc.json"),
  fse.copy("../README.md", "output/README.md"),
])
  .then(() => {
    utils.createJsConfig("output/jsconfig.json");

    const srcFiles = utils.buildTree("output/src");
    // const pagesFiles = utils.buildTree("output/pages");
    utils.transformTsToJs(srcFiles);
    // utils.transformTsToJs(pagesFiles);
  })
  .catch((err) => console.log(err));
