require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const apiRouter = require('./api-router')
const throng = require('throng')
const PORT = process.env.PORT || 8080
const WORKERS = process.env.WEB_CONCURRENCY || 1

throng({
  workers: WORKERS,
  start: id => {
    console.log(`Started thread with id ${id}`)
    express()
      .use(morgan('tiny'))
      .use('/api', apiRouter)
      .get('/', (req, res) => res.json({ status: 'UP AND RUNNIG' }))
      .get('*', (req, res) => res.status(404).json({ status: 'NOT FOUND' }))
      .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
  }
})
