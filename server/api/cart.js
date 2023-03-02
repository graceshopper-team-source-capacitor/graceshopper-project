const router = require('express').Router()
const { models: { Product, Order }} = require('../db')

// GET for a single order for a single user
router.get('/:userId', async (req, res, next) => {
  const orderId = await Order.findOne({
    where: { userId: req.params.userId },
  })
  res.send(orderId)
})


//remove something from the cart


module.exports = router