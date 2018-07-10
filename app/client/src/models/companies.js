const pubSub = require('../helpers/pubsub')
const request = require('../helpers/request')

const Companies = function () {
    this.url = '/api/companies'
}

Companies.prototype.bindEvents = function() {
    pubSub.subscribe('CompanySearchView:search-text', (event) => {
       this.search(event.detail)
    })

    pubSub.subscribe('CompanySearch:company-selected', (event) => {
        this.getChartData(event.detail)
    })

    pubSub.subscribe('PortfolioFormView:get-price', event => {
        this.getPrice(event.detail)
    })
}

Companies.prototype.search = function(searchText) {
    request.get(`${this.url}/search/${searchText}`, (error, res) => {
        pubSub.publish('Companies:search-results', res)
    })
}

Companies.prototype.getPrice = function(symbol) {
    request.get(`${this.url}/price/${symbol}`, (error, res) => {
        pubSub.publish('Companies:price-result', res.price)
    })
}

Companies.prototype.getChartData = function(company) {
  const symbol = company.symbol
  request.get(`/api/portfolio/chart-data/${symbol}`, (error, res) => {
    pubSub.publish('Companies:company-chart-data', res)
})
}

module.exports = Companies;