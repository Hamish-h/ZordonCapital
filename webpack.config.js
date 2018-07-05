const config = {
  entry: `${__dirname}/app/client/src/app.js`,
  output: {
    path: `${__dirname}/app/client/public/js`,
    filename: 'bundle.js'
  },
  mode: 'development'
};

module.exports = config;
