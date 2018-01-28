module.exports = function (wallaby) {
    var path = require('path');

    return {
      files: [
        'src/**/*.ts?(x)',
        'src/**/*.snap',
        '!src/**/*.spec.ts?(x)'
      ],
      tests: [
        'src/**/*.spec.ts?(x)'
      ],
  
      env: {
        type: 'node',
        runner: 'node'
      },
  
      testFramework: 'jest',
  
      setup: function (wallaby) {
        const jestConfig = require('./package.json').jest;
        jestConfig.modulePaths = jestConfig.modulePaths.map(p => p.replace('<rootDir>', wallaby.projectCacheDir));
        wallaby.testFramework.configure(jestConfig);
      },

      debug: true
    };
  };