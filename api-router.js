const express = require('express')
const router = express.Router()
const memoize = require('lodash.memoize')
require('dotenv').config()

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getAmqpConnection = memoize(async () => {
  const conn = await require('amqplib').connect(process.env.CLOUDAMQP_URL)
  return conn.createChannel()
})

router
  .get('/long-async-task', async (req, res, next) => {
    await sleep(1000)
    res.status(200).json({ res: 'long task executed' })
  })
  .get('/long-blocking-task', (req, res) => {
    for (let i = 0; i < 20000000; i++) {
      Math.random()
    }
    res.status(200).json({ res: 'long task executed' })
  })
  .post('/amqp-task', async (req, res) => {
    const ch = await getAmqpConnection()
    await ch.sendToQueue('tasks', req.body)
    res.status(200).json({ res: 'task added to queue' })
  })

module.exports = router
