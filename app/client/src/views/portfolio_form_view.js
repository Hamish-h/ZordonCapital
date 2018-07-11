const pubSub = require('../helpers/pubsub.js');
const Highcharts = require('highcharts')

const PortfolioFormView = function (container) {
    this.form = container.querySelector('#new-share');
    this.chart = container.querySelector('.chart');

    this.form.reset()
}

PortfolioFormView.prototype.bindEvents = function () {
    this.form.addEventListener('submit', (evt) => {
        this.handleSubmit(evt);
    })

    pubSub.subscribe('CompanySearch:company-selected', event=>{
        this.companySelect(event.detail)
    })

    pubSub.subscribe('Companies:price-result', event => {
        this.updatePrice(event.detail)
    })

    pubSub.subscribe('Companies:company-chart-data', (event) => {
        this.renderChart(event.detail)
    })
};

PortfolioFormView.prototype.handleSubmit = function (evt) {
    evt.preventDefault(evt);
    const newShare = this.createShare(evt.target);
    pubSub.publish('PortfolioFormView:share-submitted', newShare);
    evt.target.reset();

    const submitButton = this.form.querySelector('input[type="submit"]')
    submitButton.disabled = true
    this.chart.innerHTML = ""
}

PortfolioFormView.prototype.createShare = function (form) {
    const newShare = {
       symbol: form.symbol.value,
       companyName: form.companyname.value,
       purchasePrice: Number(form.purchaseprice.value),
       volume: Number(form.volume.value),
    }
    return newShare;
}

PortfolioFormView.prototype.companySelect = function (company){
    const symbol = this.form.querySelector('#symbol')
    const name = this.form.querySelector('#companyname')
    symbol.value = company.symbol
    name.value = company.name

    const priceElement = this.form.querySelector('#purchaseprice')
    priceElement.value = 'Loading...'

    pubSub.publish('PortfolioFormView:get-price', company.symbol)
}

PortfolioFormView.prototype.updatePrice = function(price) {
    const priceElement = this.form.querySelector('#purchaseprice')
    priceElement.value = price

    const submitButton = this.form.querySelector('input[type="submit"]')
    submitButton.disabled = false
}

PortfolioFormView.prototype.renderChart = function(chartData) {
    const companyName = this.form.querySelector('#companyname').value

    Highcharts.chart(this.chart, {
      xAxis: {
        type: 'datetime',
          dateTimeLabelFormats: {
          month: '%e. %b',
          year: '%b'},
        
        title: {
            text: 'Date'
        }
      },
      title: {
          text: companyName
      },
      series: [{
        data: chartData,
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
  }


module.exports = PortfolioFormView;
