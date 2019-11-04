const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router
  .use(bodyParser.json())
  .post('/long-task', (req, res) => {
    for (let i = 0; i < 2000000; i++) Math.random()
    res.json({ status: `Long task successfully executed, ${req.body.name}` })
  })

module.exports = router
