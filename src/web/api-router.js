const express = require('express')
const router = express.Router()
const { sleep, connectToRabbit } = require('../common/utils')

router
  .get('/async-long-task', async (req, res) => {
    await sleep(1000)
    res.json({ status: 'Async long task successfully executed' })
  })
  .get('/blocking-long-task', (req, res) => {
    for (let i = 0; i < 200000000; i++) Math.random()
    res.json({ status: 'Blocking long task successfully executed' })
  })
  .post('/rabbit-long-task', async (req, res) => {
    const ch = await connectToRabbit()
    await ch.sendToQueue('tasks', req.body)
    res.json({ status: 'Rabbit long task successfully executed' })
  })

module.exports = router
