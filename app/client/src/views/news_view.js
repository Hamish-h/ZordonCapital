const pubSub = require('../helpers/pubsub')
const request = require('../helpers/request')

const News = function(container) {
  this.container = container
  this.articles = []
  this.ndx = 0
  this.lastUpdate = -6000
}

News.prototype.start = function() {
  request.get('https://api.iextrading.com/1.0/stock/market/news/last/10', (error, res) => {
    this.articles = [...res]
    this.update()
  })
}

News.prototype.update = function() {
  requestAnimationFrame(() => this.update())
  
  const currentTime = performance.now()
  
  if (currentTime >= (this.lastUpdate + 6000)) {
    this.renderArticle(this.articles[this.ndx])
    this.ndx++
    if (this.ndx >= this.articles.length) {this.ndx = 0}
    this.lastUpdate = currentTime
  }
}

News.prototype.renderArticle = function(article) {
  const news = this.container
  news.innerHTML = ''
  
  const {headline, source, url} = article
  
  const div = document.createElement('div')
  div.className = 'headline'
  div.innerHTML = headline
  
  const space = document.createElement('div')
  space.innerHTML = '&nbsp;-&nbsp;'
  
  const link = document.createElement('a')
  link.href = url
  link.textContent = source

  news.appendChild(div)
  news.appendChild(space)
  news.appendChild(link)
}

module.exports = News