const express = require('express')
const router = express.Router()

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

router.get('/long-task', async (req, res, next) => {
  for (let i = 0; i < 20000000; i++) {
    Math.random()
  }
  // await sleep(1000)
  res.status(200).json({ res: 'long task executed' })
})

module.exports = router
