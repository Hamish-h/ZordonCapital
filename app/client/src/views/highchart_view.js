const pubSub = require('../helpers/pubsub')

const HighchartView = function(container){
  this.container = container
}

const exchangeDaily = document.querySelector('#highchart')
exchangeDaily.addEventListener('click', event => {
  console.log(event)
  event.preventDefault()


    Highcharts.chart('highchart-view', {
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



