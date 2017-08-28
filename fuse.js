/*
 * Imports
 */
const path = require('path');
const express = require('express');
const { FuseBox, QuantumPlugin, WebIndexPlugin } = require("fuse-box");

/*
 * Config
 */

const bundleName = "sodium";
const devPageTitle = "Sodium";


/*
 * No need to adjust anything below this line
 */

const BUILD = {
    DEV: "dev",
    PLAIN: "build:plain",
    PRODUCTION: "build:prod",
    TEST: "test-unit",
    
}

const buildType = process.env.BUILD_TYPE;
const staticRoot = "./src/dev";
const sourceMapStyle = { inline: false };

//sanity check
if(Object.keys(BUILD).map(key => BUILD[key]).indexOf(buildType) === -1) {
    console.error(`unknown build type! [${buildType}]`);
    process.exit();
}
console.log(`----------- building [${buildType}] --------`);

//create producer
const fuse = FuseBox.init({
    homeDir: "src",
    output: (buildType !== BUILD.PRODUCTION) ? `dist/$name.js` : `dist/$name.min.js`,
    target: "browser",
    
    package: (buildType === BUILD.TEST) ? undefined : "sodiumjs",
    
    globals: (buildType === BUILD.TEST) ? undefined : { "sodiumjs": "Sodium" },
    
    sourceMaps: (buildType === BUILD.PRODUCTION) ? undefined : sourceMapStyle,
    plugins: [
        buildType === BUILD.PRODUCTION
        && QuantumPlugin({
            bakeApiIntoBundle: bundleName,
            treeshake: true,
            uglify: true,
            target: "browser"
        }),

        buildType === BUILD.DEV
        && WebIndexPlugin({
            title: devPageTitle,
            template: staticRoot + "/index.html",
            path: "."
        })
    ]
});

//create bundle
const bundle = fuse.bundle(bundleName);

if (buildType !== BUILD.TEST) {
    switch(buildType) {
        case BUILD.DEV:
            bundle.instructions(`>dev/DevInit.ts`);
            break;
        default:
            bundle.instructions(`>lib/Sodium.ts`);
            break;
    }
} else {
    bundle.test("[tests/unit/**/**.test.ts]");
}

//setup dev server
if (buildType === BUILD.DEV) {
    bundle
      .watch()
      .hmr();
    fuse.dev({ open: true }, server => {
        const app = server.httpServer.app;
        app.use("/static/", express.static(staticRoot));
    });
}

//go!
fuse.run();