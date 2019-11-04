const express = require('express')
const apiRouter = require('./api-router')
const morgan = require('morgan')
const bodyParser = require('body-parser')

express()
  .use(morgan('tiny'))
  .use(bodyParser.raw({
    type: '*/*'
  }))
  .get('/', (req, res) => {
    res.status(200).json({ res: 'UP AND RUNNING' })
  })
  .use('/api', apiRouter)
  .listen(process.env.PORT || 8080, () => console.log(`LISTENING ON PORT ${process.env.PORT || 8080}`))
