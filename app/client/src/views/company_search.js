const pubSub = require('../helpers/pubsub')

const CompanySearchView = function(container){
  this.container = container
}

CompanySearchView.prototype.bindEvents = function() {
  this.container.addEventListener('submit', event => {
    event.preventDefault()
    const searchText = event.target.company_search_text.value
    pubSub.publish('CompanySearchView:search-text', searchText)

    event.target.reset()
  })

  pubSub.subscribe('Companies:search-results', event => {
    const searchResults = event.detail
    this.render(searchResults)
  })
}

CompanySearchView.prototype.render = function(searchResults) {
  const resultElement = this.container.querySelector('#company-search-results tbody')
  resultElement.innerHTML = ''

  for (searchResult of searchResults) {
    const tr = document.createElement('tr')

    const symbol = document.createElement('td')
    symbol.textContent = searchResult.symbol

    const name = document.createElement('td')
    name.textContent = htmlDecode(searchResult.name)

    tr.appendChild(symbol)
    tr.appendChild(name)
    resultElement.appendChild(tr)
  }
}

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

module.exports = CompanySearchView