const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('app/client/public'))

const portfolio_db = require('./models/portfolio_db')
portfolio_db.connect((portfolioRouter) => {
  app.use('/api/portfolio', portfolioRouter);
})

const companies_db = require('./models/company_db')
app.use('/api/companies', companies_db);

app.listen(3000, () => {
  console.log(`Express running at http://localhost:3000`)
})