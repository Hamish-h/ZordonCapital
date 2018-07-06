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
    for (const row of portfolio) {
        const {symbol, purchasePrice, currency, volume} = row
        console.log(symbol, purchasePrice, currency, volume)
    }
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