const memoize = require('lodash.memoize')
require('dotenv').config()

const getAmqpConnection = memoize(async () => {
  const conn = await require('amqplib').connect(process.env.CLOUDAMQP_URL)
  return conn.createChannel()
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
