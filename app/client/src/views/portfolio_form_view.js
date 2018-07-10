const pubSub = require('../helpers/pubsub.js');

const PortfolioFormView = function (form) {
    this.form = form;
}

PortfolioFormView.prototype.bindEvents = function () {
    this.form.addEventListener('submit', (evt) => {
        this.handleSubmit(evt);
    })
    pubSub.subscribe('CompanySearch:company-selected', event=>{
        this.companySelect(event.detail)
    })
};

PortfolioFormView.prototype.handleSubmit = function (evt) {
    evt.preventDefault(evt);
    const newShare = this.createShare(evt.target);
    pubSub.publish('PortfolioFormView:share-submitted', newShare);
    evt.target.reset();
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
}


module.exports = PortfolioFormView;
