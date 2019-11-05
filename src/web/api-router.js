const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { connectToRabbitMq } = require('../common/utils')

router
  .use(bodyParser.raw({ type: '*/*' }))
  .post('/long-task', async (req, res) => {
    const ch = await connectToRabbitMq()
    await ch.sendToQueue(process.env.QUEUE_NAME, req.body)
    res.json({ status: 'Long task successfully enqueued' })
  })

module.exports = router
