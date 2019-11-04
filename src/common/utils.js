const amqplib = require('amqplib')
const memoize = require('lodash.memoize')
require('dotenv').config()

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const connectToRabbit = memoize(async () => {
  const conn = await amqplib.connect(process.env.CLOUDAMQP_URL)
  return conn.createChannel()
})

module.exports = {
  sleep,
  connectToRabbit
}
