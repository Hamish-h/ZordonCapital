const config = {
  entry: `${__dirname}/app/client/src/app.js`,
  output: {
    path: `${__dirname}/app/client/public/`,
    filename: 'bundle.js'
  },
  mode: 'development'
};

module.exports = config;
