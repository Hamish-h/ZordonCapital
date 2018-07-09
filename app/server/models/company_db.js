const MongoClient = require ('mongodb').MongoClient;

function getName(symbol, callback){
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            console.log(err);
            callback(err);
            return 
        }

        const db = client.db('zordoncapital');
        const companyCollection = db.collection('companies');

        companyCollection.findOne({symbol})
        .then(match =>{ 
            callback(null, match.name)
        })
    })
}

module.exports = {getName};