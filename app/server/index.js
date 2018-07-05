const express = require('express')
const app = express()

app.use(express.static('app/client/public'))

app.listen(3000, () => {
  console.log(`Express running at http://localhost:3000`)
})