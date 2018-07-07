const PubSub = require('../helpers/pubsub.js')
const PortfolioView = require('./portfolio.js')

const PortfolioGridView = function(container){
    this.container = container
}

PortfolioGridView.prototype.bindEvents = function(){
  PubSub.subscribe('Portfolio-view:portfolio-data', (evt) =>{
    this.render(evt.detail);
  })
}

PortfolioGridView.prototype.render = function(shares){
  this.container.innerHTML = '';
  const portfolioView = new PortfolioView(this.container);
  shares.forEach(share => portfolioView.render(share));
};


module.exports = PortfolioGridView;