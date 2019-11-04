const amqplib = require('amqplib')
const memoize = require('lodash.memoize')
require('dotenv').config()

const connectToRabbit = memoize(async () => {
  const conn = await amqplib.connect(process.env.CLOUDAMQP_URL)
  return conn.createChannel()
})

module.exports = { connectToRabbit }
