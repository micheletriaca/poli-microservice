require('dotenv').config()
const throng = require('throng')
const { connectToRabbitMq } = require('../common/utils')
const WORKERS = process.env.WEB_CONCURRENCY || 1

throng({
  workers: WORKERS,
  start: id => {
    console.log(`started thread ${id}`)
    ;(async () => {
      const ch = await connectToRabbitMq()
      ch.prefetch(10)
      ch.consume(process.env.QUEUE_NAME, msg => {
        for (let i = 0; i < 2000000; i++) Math.random()
        const jsonMsg = JSON.parse(msg.content)
        ch.ack(msg)
        console.log(`Async long task successfully executed, ${jsonMsg.name}. 🥳`)
      })
    })()
  }
})
