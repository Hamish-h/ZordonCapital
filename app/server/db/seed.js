use zordoncapital;
db.dropDatabase();

db.portfolio.insertMany([
{
  symbol: 'RBS.L',
  companyName: 'Royal Bank Of Scotland',
  purchasePrice: 300,
  purchaseDate: '2018-08-19',
  currency: 'gbp',  
  volume: 20,
  currentPrice: 350,
},
{
  symbol: 'RBS.L',
  companyName: 'Royal Bank Of Scotland',
  purchasePrice: 300,
  purchaseDate: '2018-09-23',
  currency: 'gbp',  
  volume: 30,
  currentPrice: 350,
}
]);