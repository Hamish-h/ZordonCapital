const pubSub = require('./helpers/pubsub')
const Portfolio_view = require('./views/portfolio')

const portfolioElement = document.querySelector('#portfolio')
const portfolioView = new Portfolio_view(portfolioElement)
portfolioView.bindEvents()

pubSub.publish('Portfolio-view:get-portfolio', [{
    symbol: 'RBS.L',
    purchasePrice: 300,
    currency: 'gbp',
    volume: 20
  },
  {
    symbol: 'RBS.L',
    purchasePrice: 310,
    currency: 'gbp',
    volume: 10
  }])