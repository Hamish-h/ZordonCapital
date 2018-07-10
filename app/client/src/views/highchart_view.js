const exchangeDaily = document.querySelector('#exchange__daily')
exchangeDaily.addEventListener('submit', event => {
  console.log(event)
  event.preventDefault()

  exchange.singleQuoteDaily().then(res => {
    const dailyPrices = res['Time Series (Daily)']
    const priceResults = []
    for ( const dailyPriceDate in dailyPrices){
      const dailyPrice = dailyPrices[dailyPriceDate]['4. close']
      const formattedDate = new Date(dailyPriceDate).valueOf()
      priceResults.push([formattedDate, Number(dailyPrice)])
    }
    console.log(priceResults)
    
    
    Highcharts.chart('exchange__daily__result', {
      xAxis: {
        type: 'datetime',
          dateTimeLabelFormats: {
          month: '%e. %b',
          year: '%b'},
        
        title: {
            text: 'Date'
        }
      },
      series: [{
        data: priceResults,
        name: 'USD'
      }],
      yAxis: {
        type: 'number',
        title: {
            text: 'Close Price'
        }
      },
      tooltip: {
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} USD'
  },
    })
  })
})

function apiError(error) {
  console.log(error)
}

  HighchartView.prototype.bindEvents = function() {
    pubSub.subscribe('highchart', (event) => {
      const portfolio = event.detail
      this.render(highchart) 
    })
  }

module.exports = HighchartView;



