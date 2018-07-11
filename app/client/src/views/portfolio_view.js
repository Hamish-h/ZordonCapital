const pubSub = require('../helpers/pubsub')

const PortfolioView = function(container){
  this.container = container
}

PortfolioView.prototype.bindEvents = function() {
  pubSub.subscribe('Portfolio-view:portfolio-data', (event) => {
    const portfolio = event.detail
    this.render(portfolio) 
  })
}

PortfolioView.prototype.getData = function() {
  pubSub.publish('Portfolio:get-portfolio')
}

PortfolioView.prototype.render = function(portfolio) {
  this.container.innerHTML = ''

  const htag = document.createElement('h2')
  htag.textContent = 'My Portfolio'
	const table = document.createElement('table')
  const thead = document.createElement('thead')
  const thead_tr = document.createElement('tr')

  const headings = ['_id', 'Symbol', 'Company Name', 'Date', 'Volume', 'Bought At', 'Current Price', 'P/L']
  const keys = ['_id', 'symbol', 'companyName', 'purchaseDate', 'volume', 'purchasePrice', 'currentPrice', 'pl']
  for (const heading of headings) {
    const td = document.createElement('td')
    td.className = heading
    td.textContent = heading
    thead_tr.appendChild(td)
  }

  thead.appendChild(thead_tr)

  const tbody = document.createElement('tbody')
	for (const row of portfolio) {
    row.purchaseDate = new Date(row.purchaseDate).toISOString().substr(0, 10)
    const tbody_tr = document.createElement('tr')
    for (const key of keys) {
      const value = row[key]
      const element = document.createElement('td')
      element.className = key

      if (key === 'pl') {
        element.classList.add(value>=0?'up':'down')
      }
       
      element.textContent = value

      tbody_tr.appendChild(element)
    }

    tbody.appendChild(tbody_tr)
  }

  table.appendChild(thead)
  table.appendChild(tbody)
  this.container.appendChild(htag)
  this.container.appendChild(table)
}

module.exports = PortfolioView