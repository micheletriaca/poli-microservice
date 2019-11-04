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
      ch.consume('tasks', msg => {
        const jsonMsg = JSON.parse(msg.content.toString())
        console.log(`🥳 ${jsonMsg.name}`)
        ch.ack(msg)
      })
    })()
  }
})