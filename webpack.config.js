const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      fs: false, // dotenv doesn't need `fs` in the browser
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
    },
  },
};
