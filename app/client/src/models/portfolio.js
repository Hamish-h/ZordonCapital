const pubSub = require('../helpers/pubsub')
const request = require('../helpers/request')

const PortfolioModel = function() {
  this.url = '/api/portfolio'
}

PortfolioModel.prototype.bindEvents = function() {
  pubSub.subscribe('Portfolio:get-portfolio', () => {
    this.getPortfolio()
  })
}

PortfolioModel.prototype.getPortfolio = function () {
  request.get(this.url, (error, data) => {
    pubSub.publish('Portfolio-view:portfolio-data', data)
  })
}

module.exports = PortfolioModel