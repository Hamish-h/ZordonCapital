const MongoClient = require ('mongodb').MongoClient;
const router = require('express').Router();
router.get('/search/:search_text', (req, res) =>{
  search(req.params.search_text, (error, companies)=>{
    res.json(companies)  
  })
})

function search(text, callback){
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            console.log(err);
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