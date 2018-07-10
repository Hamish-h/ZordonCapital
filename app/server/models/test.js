const av = require('./alphaVantage_api')

av.quote('AAPL', price => {
  console.log(price)
})