const pubSub = require('../helpers/pubsub')

const CompanySearchView = function(container){
  this.container = container
  this.table = container.querySelector('#company-search-results')
}

CompanySearchView.prototype.bindEvents = function() {
  this.container.addEventListener('submit', event => {
    event.preventDefault()
    const searchText = event.target.company_search_text.value
    pubSub.publish('CompanySearchView:search-text', searchText)
    this.table.classList.remove('hidden')
    event.target.reset()
  })

  pubSub.subscribe('Companies:search-results', event => {
    const searchResults = event.detail
    this.render(searchResults)
  })

  pubSub.subscribe('Companies:company-chart-data', (event) => {
    this.renderChart(event.detail)
  })
}

CompanySearchView.prototype.renderChart = function(chartData) {
  console.log(chartData);
}

CompanySearchView.prototype.render = function(searchResults) {
  const resultElement = this.container.querySelector('#company-search-results tbody')
  resultElement.innerHTML = ''

  for (searchResult of searchResults) {
    const tr = document.createElement('tr')
    tr.setAttribute('data-name', searchResult.name)
    tr.setAttribute('data-symbol', searchResult.symbol)

    const symbol_td = document.createElement('td')
    const symbol = document.createElement('a')
    symbol.textContent = searchResult.symbol
    symbol.href = `#${searchResult.symbol}`
    symbol_td.appendChild(symbol)

    const name_td = document.createElement('td')
    const name = document.createElement('a')
    name.textContent = htmlDecode(searchResult.name)
    name.href = `#${searchResult.symbol}`
    name_td.appendChild(name)

    const handleClick = (event) => {
        event.preventDefault()
        const company = tr.attributes

        pubSub.publish('CompanySearch:company-selected', {
          name:company['data-name'].value,
          symbol:company['data-symbol'].value
        })

        this.table.classList.add('hidden')
    }
    name.addEventListener('click', handleClick)
    symbol.addEventListener('click', handleClick)

    tr.appendChild(symbol_td)
    tr.appendChild(name_td)
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