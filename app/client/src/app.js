const Portfolio_view = require('./views/portfolio')
const PortfolioModel = require('./models/portfolio')

const portfolioElement = document.querySelector('#portfolio')
const portfolioView = new Portfolio_view(portfolioElement)
portfolioView.bindEvents()

const portfolioModel = new PortfolioModel
portfolioModel.bindEvents()

portfolioView.getData()