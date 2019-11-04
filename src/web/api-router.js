const express = require('express')
const router = express.Router()
const { connectToRabbit } = require('../common/utils')

router
  .get('/blocking-long-task', (req, res) => {
    for (let i = 0; i < 2000000; i++) Math.random()
    res.json({ status: 'Blocking long task successfully executed' })
  })
  .post('/rabbit-long-task', async (req, res) => {
    const ch = await connectToRabbit()
    await ch.sendToQueue(process.env.QUEUE_NAME, req.body)
    res.json({ status: 'Rabbit long task successfully executed' })
  })

module.exports = router
