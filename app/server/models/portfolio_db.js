const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const av = require('./alphaVantage_api')

function connect(callback) {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
      console.error(err);
    }
    
    const db = client.db('zordoncapital');
    const portfolioCollection = db.collection('portfolio');

    function logError (error, res) {
      console.error(error);
      res.status(500);
      res.json({ status: 500, error });
    }
    
    function allShares (callback) {
      portfolioCollection
        .find()
        .toArray()
        .then(stocks => {
          const symbols = stocks.map(stock => stock.symbol)

          av.batchQuote(symbols, (error, prices) => {
            console.log(prices)
            for (const ndx in stocks) {
              const stock = stocks[ndx]
              const match = prices.find(price => price.symbol===stock.symbol)
              if (!match) {
                stocks[ndx].currentPrice = 'no price found'
              } else {
                stocks[ndx].currentPrice = match.price
              }
            }

            callback(stocks)
          })
        })
        .catch(error => logError(error, res)); 
    }

    const portfolioRouter = express.Router();

    portfolioRouter.get('/', (req, res) => {
      allShares(shares => {
        res.json(shares)
      })
    });

    portfolioRouter.get('/:id', (req, res) => {
      const id = req.params.id;

      portfolioCollection
        .find({ _id: ObjectID(id) })
        .toArray()
        .then((docs) => res.json(docs))
        .catch(error => logError(error, res));        
    });

    portfolioRouter.post('/', (req, res) => {
      const newData = req.body;
      
      portfolioCollection
        .insertOne(newData)
        .then(allShares(shares => res.json(shares)))
        .catch(error => logError(error, res));
    });

    portfolioRouter.put('/:id', (req, res) => {
      const _id = ObjectId(req.params.id);
      const updatedData = req.body;

      portfolioCollection
        .updateOne({_id}, {$set: updatedData})
        .then(allShares(shares => res.json(shares)))
        .catch(error => logError(error, res));
    });

    portfolioRouter.delete('/:id', (req, res) => {
      const _id = ObjectId(req.params.id);
      const id = req.params.id;

      portfolioCollection
        .deleteOne({_id})
        .then(allShares(shares => res.json(shares)))        
        .catch(error => logError(error, res));        
    });
    
    callback(portfolioRouter)
  });
}

module.exports = {connect}
