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

  pubSub.subscribe('Companies:search-results', event => {
    const searchResults = event.detail
    this.render(searchResults)
  })
}

CompanySearchView.prototype.render = function(searchResults) {
  const resultElement = this.container.querySelector('#company-search-results tbody')

  for (searchResult of searchResults) {
    const tr = document.createElement('tr')

    const symbol = document.createElement('td')
    symbol.textContent = searchResult.symbol

    const name = document.createElement('td')
    name.textContent = searchResult.name

    tr.appendChild(symbol)
    tr.appendChild(name)
    resultElement.appendChild(tr)
  }
}

module.exports = CompanySearchView