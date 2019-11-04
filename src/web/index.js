const express = require('express')
const morgan = require('morgan')
const apiRouter = require('./api-router')
const bodyParser = require('body-parser')
const throng = require('throng')
const WORKERS = process.env.WEB_CONCURRENCY || 1

throng({
  workers: WORKERS,
  start: id => {
    console.log(`Started thread with id ${id}`)
    express()
      .use(morgan('tiny'))
      .use(bodyParser.raw({ type: '*/*' }))
      .use('/api', apiRouter)
      .get('/', (req, res) => res.json({ status: 'UP AND RUNNIG' }))
      .get('*', (req, res) => res.status(404).json({ status: 'NOT FOUND' }))
      .listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}`))
  }
})