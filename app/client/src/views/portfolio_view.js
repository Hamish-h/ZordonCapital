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

// PortfolioView.prototype.deleteShare = function() {
//   pubSub.publish('Portfolio-model:portfolio-data')
// }

PortfolioView.prototype.render = function(portfolio) {
  this.container.innerHTML = ''

  const htag = document.createElement('h2')
  htag.textContent = 'My Portfolio'
	const table = document.createElement('table')
  const thead = document.createElement('thead')
  const thead_tr = document.createElement('tr')

  const headings = ['_id', 'Symbol', 'Company Name', 'Price', 'Date', 'Currency', 'Volume']
  for (const heading of headings) {
    const td = document.createElement('td')
    td.className = heading
    td.textContent = heading
    thead_tr.appendChild(td)
  }

  thead.appendChild(thead_tr)

  const tbody = document.createElement('tbody')
	for (const row of portfolio) {
    const tbody_tr = document.createElement('tr')
    for (const key in row) {
      const element = document.createElement('td')
      element.className = key
      element.textContent = row[key]
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



/*
    <table>
      <thead>
        <tr>
          <td>Symbol</td>
          <td>Price</td>
          <td>Currency</td>
          <td>Volume</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>RBS.L</td>
          <td>300</td>
          <td>USD</td>
          <td>20</td>
        </tr>
        <tr>
          <td>RR.L</td>
          <td>500</td>
          <td>USD</td>
          <td>50</td>
        </tr>
      </tbody>
    </table>
*/