const pubSub = require('../helpers/pubsub')
const request = require('../helpers/request')

const dummyData = [
    [
      1531180800000,
      102.14
    ],
    [
      1531094400000,
      101.85
    ],
    [
      1530835200000,
      101.16
    ],
    [
      1530748800000,
      99.76
    ],
    [
      1530576000000,
      99.05
    ],
    [
      1530489600000,
      100.01
    ],
    [
      1530230400000,
      98.61
    ],
    [
      1530144000000,
      98.63
    ],
    [
      1530057600000,
      97.54
    ],
    [
      1529971200000,
      99.08
    ],
    [
      1529884800000,
      98.39
    ],
    [
      1529625600000,
      100.41
    ],
    [
      1529539200000,
      101.14
    ],
    [
      1529452800000,
      101.87
    ],
    [
      1529366400000,
      100.86
    ],
    [
      1529280000000,
      100.86
    ],
    [
      1529020800000,
      100.13
    ],
    [
      1528934400000,
      101.42
    ],
    [
      1528848000000,
      100.85
    ],
    [
      1528761600000,
      101.31
    ],
    [
      1528675200000,
      101.05
    ],
    [
      1528416000000,
      101.63
    ],
    [
      1528329600000,
      100.88
    ]
  ]

const Companies = function () {
    this.url = '/api/companies'
}

Companies.prototype.bindEvents = function() {
    pubSub.subscribe('CompanySearchView:search-text', (event) => {
       this.search(event.detail)
    })

    pubSub.subscribe('CompanySearch:company-selected', (event) => {
        pubSub.publish('Companies:company-chart-data', dummyData)
    })

    pubSub.subscribe('PortfolioFormView:get-price', event => {
        this.getPrice(event.detail)
    })
}

Companies.prototype.search = function(searchText) {
    request.get(`${this.url}/search/${searchText}`, (error, res) => {
        pubSub.publish('Companies:search-results', res)
    })
}

Companies.prototype.getPrice = function(symbol) {
    request.get(`${this.url}/price/${symbol}`, (error, res) => {
        pubSub.publish('Companies:price-result', res.price)
    })
}

module.exports = Companies;