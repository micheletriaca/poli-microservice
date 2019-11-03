const express = require('express')
const apiRouter = require('./api-router')
const morgan = require('morgan')

express()
  .use(morgan('tiny'))
  .get('/', (req, res) => {
    res.status(200).json({ res: 'UP AND RUNNING' })
  })
  .use('/api', apiRouter)
  .listen(process.env.PORT || 8080, () => console.log('LISTENING ON PORT 8080'))
