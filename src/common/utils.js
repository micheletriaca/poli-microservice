const memoize = require('lodash.memoize')
const amqplib = require('amqplib')

const connectToRabbitMq = memoize(async () => {
  const conn = await amqplib.connect(process.env.CLOUDAMQP_URL)
  return conn.createChannel()
})

module.exports = { connectToRabbitMq }
