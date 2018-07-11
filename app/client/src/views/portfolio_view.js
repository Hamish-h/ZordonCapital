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
  let purchaseCost = 0
  let currentValue = 0

	for (const row of portfolio) {
    purchaseCost += (row.volume * row.purchasePrice)
    currentValue += (row.volume * row.currentPrice)

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

  const totalPL = currentValue - purchaseCost

  const tfoot = totalRow([purchaseCost, currentValue, totalPL])

  table.appendChild(thead)
  table.appendChild(tbody)
  table.appendChild(tfoot)
  this.container.appendChild(htag)
  this.container.appendChild(table)
}

function totalRow(totalsArray) {
  const tfoot = document.createElement('tfoot')
  const tfoot_tr = document.createElement('tr')

  const td_pad = document.createElement('td')
  td_pad.textContent = "Totals"
  td_pad.setAttribute('colspan', "4")
  tfoot_tr.appendChild(td_pad)

  for (key in totalsArray) {
    const value = totalsArray[key]
    const td = document.createElement('td')
    td.textContent = Number.parseFloat(value).toFixed(2)

    console.log({key})
    if (key === "2") {
      td.classList.add('pl')
      td.classList.add(value>=0?'up':'down')
    } else {
      td.textContent = `$ ${td.textContent}`
    }

    tfoot_tr.appendChild(td)
  }

  tfoot.appendChild(tfoot_tr)

  return tfoot
}

module.exports = PortfolioView