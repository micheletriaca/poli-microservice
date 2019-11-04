const { connectToRabbit } = require('../common/utils')
const throng = require('throng')
const WORKERS = process.env.WEB_CONCURRENCY || 1

throng({
  workers: WORKERS,
  start: id => {
    console.log(`Started worker with id ${id}`)
    ;(async () => {
      const ch = await connectToRabbit()
      ch.prefetch(10)
      ch.consume(process.env.QUEUE_NAME, msg => {
        for (let i = 0; i < 2000000; i++) Math.random()
        const jsonMsg = JSON.parse(msg.content.toString())
        console.log(`🥳 ${jsonMsg.name}`)
        ch.ack(msg)
      })
    })()
  }
})
