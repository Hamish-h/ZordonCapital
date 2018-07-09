const pubSub = require('../helpers/pubsub')

const CompanySearchView = function(container){
  this.container = container
}

CompanySearchView.prototype.bindEvents = function() {
  this.container.addEventListener('submit', event => {
    event.preventDefault()
    const searchText = event.target.company_search_text.value
    pubSub.publish('CompanySearchView:search-text', searchText)
  })
}

module.exports = CompanySearchView