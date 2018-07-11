const MongoClient = require ('mongodb').MongoClient;
const router = require('express').Router();
const av = require('./alphaVantage_api')


router.get('/price/:symbol', (req, res) => {
    av.quote(req.params.symbol, (err, price) => {
        if (err) {
            console.error(err);
            res.status(500);
            res.json({ err })
            return 
        } 
        res.json({ price })
    })
})

router.get('/search/:search_text', (req, res) =>{
  search(req.params.search_text, (error, companies)=>{
    res.json(companies)  
  })
})

function search(text, callback){
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.error(err);
            callback(err);
            return 
        }

        const db = client.db('zordoncapital');
        const companyCollection = db.collection('companies');

        companyCollection.find({name:new RegExp(`.*${text}.*`, 'i')})
          .toArray()
            .then(matches =>{ 
                callback(null, matches)
            })
    })
}

module.exports = router;