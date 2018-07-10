  HighchartView.prototype.bindEvents = function() {
    pubSub.subscribe('highchart', (event) => {
      const portfolio = event.detail
      this.render(highchart) 
    })
  }


  module.exports = HighchartView;



