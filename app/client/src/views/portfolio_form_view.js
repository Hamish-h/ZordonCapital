const PubSub = require('../helpers/pubsub.js');

const PortfolioFormView = function (form) {
    this.form = form;
}

PortfolioFormView.prototype.bindEvents = function () {
    this.form.addEventListener('submit', (evt) => {
        this.handleSubmit(evt);
    })
};

PortfolioFormView.prototype.handleSubmit = function (evt) {
    evt.preventDefault(evt);
    const newShare = this.createShare(evt.target);
    PubSub.publish('PortfolioFormView:share-submitted', newShare);
    evt.target.reset();
}

PortfolioFormView.prototype.createShare = function (form) {
    const newShare = {
       symbol: form.symbol.value,
       purchaseprice: Number(form.purchaseprice.value),
       currency: form.currency.value,
       volume: Number(form.volume.value)
    }
    return newShare;
}


module.exports = PortfolioFormView;
