const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const ObjectID = require('mongodb').ObjectID;

function connect(callback) {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
      console.error(err);
    }
    
    const db = client.db('zordoncapital');
    const portfolioCollection = db.collection('portfolio');

    const portfolioRouter = express.Router();

    portfolioRouter.get('/', (req, res) => {
      portfolioCollection
        .find()
        .toArray()
        .then((docs) => res.json(docs))
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
    });

    portfolioRouter.get('/:id', (req, res) => {
      const id = req.params.id;
      portfolioCollection
        .find({ _id: ObjectID(id) })
        .toArray()
        .then((docs) => res.json(docs))
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
    });

    portfolioRouter.post('/', (req, res) => {
      const newData = req.body;
      console.log(req.body);
      
      portfolioCollection
      .insertOne(newData)
      .then(() => {
        portfolioCollection
          .find()
          .toArray()
          .then((docs) => res.json(docs));
      });
    });

    portfolioRouter.put('/:id', (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      portfolioCollection
      .updateOne(
        { _id: ObjectID(id) },
        {$set: updatedData}
      )
      .then(() => {
        portfolioCollection
          .find()
          .toArray()
          .then((docs) => res.json(docs));
      })
    });

    portfolioRouter.delete('/:id', (req, res) => {
      const id = req.params.id;
      portfolioCollection
        .deleteOne({ _id: ObjectID(id) })
        .then(() => {
          portfolioCollection
            .find()
            .toArray()
            .then((docs) => res.json(docs));
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
    });
    
    callback(portfolioRouter)
  });
}

module.exports = {connect}