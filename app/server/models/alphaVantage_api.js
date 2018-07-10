const fetch = require('node-fetch')
require('dotenv').config()
const apiKey = process.env.ALPHAVANTAGE_KEY

function batchQuote(symbols, callback) {
  if (symbols.length ===0) {
    callback([])
    return
  }

  symbols = symbols.join(',')

  const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbols}&apikey=${apiKey}`

  fetch(url)
    .then(res => res.json())
    .then(res => {
      const quotes = res['Stock Quotes'].map(quote => {
        return {
          symbol: quote['1. symbol'],
          price: Number(quote['2. price'])
        }
      })

      callback(null, quotes)
    })
}

function singleQuoteDaily(symbol, callback) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${apiKey}`
  fetch(url)
  .then(res => res.json())
  .then(res => {
    const dailyPrices = res['Time Series (Daily)']
    const priceResults = []
    for ( const dailyPriceDate in dailyPrices){
      const dailyPrice = dailyPrices[dailyPriceDate]['4. close']
      const formattedDate = new Date(dailyPriceDate).valueOf()
      priceResults.push([formattedDate, Number(dailyPrice)])
    }
    callback(null, priceResults)
  }).catch(error => callback(error))
}

function quote(symbol, callback) {
  const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbol}&apikey=${apiKey}`

  fetch(url)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      const quote = res['Stock Quotes']

      if (quote.length === 0) {
        callback('error')
      } else {
        const price = Number(res['Stock Quotes'][0]['2. price'])
        callback(null, price)
      }
    })
}

module.exports = {batchQuote, quote, singleQuoteDaily}
