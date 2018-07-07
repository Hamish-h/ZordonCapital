const pubSub = require('../helpers/pubsub')
const request = require('../helpers/request')

const PortfolioModel = function() {
  this.url = '/api/portfolio'
}

PortfolioModel.prototype.bindEvents = function() {
  pubSub.subscribe('Portfolio:get-portfolio', () => {
    this.getPortfolio()
  });

  pubSub.subscribe('PortfolioFormView:share-submitted', (evt) => {
    this.postShare(evt.detail);
  });
};

PortfolioModel.prototype.getPortfolio = function () {
  request.get(this.url, (error, data) => {
    pubSub.publish('Portfolio-view:portfolio-data', data)
  });
};

PortfolioModel.prototype.postShare = function (share) {
  request.post(this.url, share, (error, data) => {
    pubSub.publish('Portfolio-view:portfolio-data', data)
  });
};

PortfolioModel.prototype.deleteShare = function (shareId) {
  const request = new Request(this.url);
  request.delete(shareId)
    .then((shares) => {
      PubSub.publish('Portfolio-view:portfolio-data', shares);
    })
    .catch(console.error);
};

module.exports = PortfolioModel