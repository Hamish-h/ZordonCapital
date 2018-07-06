const Portfolio_view = require('./views/portfolio')
const PortfolioFormView = require('./views/portfolio_form_view')
const PortfolioModel = require('./models/portfolio')

const portfolioElement = document.querySelector('#portfolio')
const portfolioView = new Portfolio_view(portfolioElement)
portfolioView.bindEvents()

const shares = document.querySelector('#new-share');
const portfolioFormView = new PortfolioFormView(shares);
portfolioFormView.bindEvents();

const portfolioModel = new PortfolioModel
portfolioModel.bindEvents()

portfolioView.getData()