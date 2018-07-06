const pubSub = require('../helpers/pubsub')

const Portfolio = function(container){
  this.container = container
}

Portfolio.prototype.bindEvents = function() {
  pubSub.subscribe('Portfolio-view:get-portfolio', (event) => {
    const portfolio = event.detail
    this.render(portfolio) 
  })
}

Portfolio.prototype.render = function(portfolio) {
	const table = document.createElement('table')
  const thead = document.createElement('thead')
  const thead_tr = document.createElement('tr')

  const headings = ['Symbol', 'Price', 'Currency', 'Volume']
  for (const heading of headings) {
    const td = document.createElement('td')
    td.textContent = heading
    thead_tr.appendChild(td)
  }

  thead.appendChild(thead_tr)

  const tbody = document.createElement('tbody')
	for (const row of portfolio) {
    const tbody_tr = document.createElement('tr')
    for (const key in row) {
      const element = document.createElement('td')
      element.textContent = row[key]
      tbody_tr.appendChild(element)
    }

    tbody.appendChild(tbody_tr)
  }
  
  table.appendChild(thead)
  table.appendChild(tbody)
  this.container.appendChild(table)
}

module.exports = Portfolio



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