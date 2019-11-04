const memoize = require('lodash.memoize')
require('dotenv').config()

const getAmqpConnection = memoize(async (version = 1) => {
  const url = process.env.CLOUDAMQP_URL
  const conn = await require('amqplib').connect(url)
  const ok = await conn.createChannel()
  conn.on('error', err => console.error('ERR22', err))
  ok.on('error', err => console.error('ERRRR', err))
  return ok
})

let count = 0

getAmqpConnection()
  .then(ch => {
    ch.prefetch(100)
    ch.consume('tasks', async msg => {
      if (msg) {
        console.log(JSON.parse(msg.content.toString()))
        ch.ack(msg)
        console.log('ACK OK', count++)
      }
    })
    ch.on('error', err => console.error(err))
  })
