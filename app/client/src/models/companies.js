const pubSub = require('../helpers/pubsub')
const request = require('../helpers/request')

const Companies = function () {
    this.url = '/api/companies'
}

Companies.prototype.bindEvents = function() {
    pubSub.subscribe('CompanySearchView:search-text', (event) => {
       this.search(event.detail)
    })
}

Companies.prototype.search = function(searchText) {
    request.get(this.url, (error, res) => {
        pubSub.publish('Companies:search-results', res)
    })
}

module.exports = Companies;