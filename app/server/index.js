const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('app/client/public'))

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.error(err);
  }

  const db = client.db('zordoncapital');
  const portfolioCollection = db.collection('portfolio');
  const portfolioRouter = createRouter(portfolioCollection)
  app.use('/api/portfolio', portfolioRouter);
});


app.listen(3000, () => {
  console.log(`Express running at http://localhost:3000`)
})