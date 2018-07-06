use zordoncapital;
db.dropDatabase();

db.portfolio.insertMany([
{
  symbol: 'RBS.L',
  purchasePrice: 300,
  currency: 'gbp',  
  volume: 20
},
{
  symbol: 'RBS.L',
  purchasePrice: 310,
  currency: 'gbp',
  volume: 10
}
]);