const router = require('express').Router()
const {
  models: { User, Product, Order, LineItem },
} = require('../db')

// /api/cart - GETS ALL CARTS

router.get('/', async (req, res, next) => {
  const order = await Order.findAll({
    include: LineItem,
  })
  console.log(order)
  res.send(order)
})

// /api/cart/:userId - GET A SINGLE CART
// THUNK WRITTEN & WORKING
router.get('/:userId', async (req, res, next) => {
  const orderById = await Order.findOne({
    where: { userId: req.params.userId },
    include: LineItem,
  })
  res.send(orderById)
})

// /api/cart/:userId - DELETE A WHOLE CART BY USER ID
// THUNK WRITTEN & WORKING
router.delete('/:userId', async (req, res, next) => {
  const orderById = await Order.findOne({
    where: { userId: req.params.userId },
    include: LineItem,
  })
  await orderById.destroy()
  res.send(orderById)
})

// /api/cart/:userId/:productId - ADD A LINE ITEM FOR USER CART
router.post('/:userId/:productId', async (req, res, next) => {
  // console.log('req.params', req.params.userId)
  const orderById = await Order.findOne({
    where: { userId: req.params.userId },
    include: LineItem,
  })
  const orderId = orderById.dataValues.id
  // console.log('orderID', orderById.dataValues.id)
  const createLineItem = await LineItem.create({
    id: req.body.id,
    qty: req.body.qty,
    productId: req.params.productId,
    orderId: orderId,
  })
  res.send(createLineItem)
})

// /api/cart/addOne/:userId/:productId - ADD ONE TO LINE ITEM
// THUNK WRITTEN & WORKING
router.put('/addOne/:userId/:productId', async (req, res, next) => {
  console.log('req.params', req.params)
  const orderById = await Order.findOne({
    where: { userId: req.params.userId },
    include: LineItem,
  })
  const lineItem = await LineItem.findOne({
    where: { id: req.params.productId },
  })
  const orderId = orderById.dataValues.id
  const updatedLineItem = await lineItem.update({
    id: req.body.id,
    qty: lineItem.dataValues.qty + 1,
    productId: req.params.productId,
    orderId: orderId,
  })
  res.send(updatedLineItem)
})

// /api/cart/addMany/:userId/:productId - ADD MANY TO LINE ITEM
// THUNK WRITTEN & WORKING
router.put('/addMany/:userId/:productId', async (req, res, next) => {
  // console.log('req.params', req.params.userId)
  const orderById = await Order.findOne({
    where: { userId: req.params.userId },
    include: LineItem,
  })
  console.log('orderById', orderById)
  const lineItem = await LineItem.findOne({
    where: { id: req.params.productId },
  })
  console.log('lineItem', lineItem)
  const orderId = orderById.dataValues.id
  // console.log('orderID', orderById.dataValues.lineItems.dataValues.qty)
  // const previousLineItemQty = orderById.dataValues.lineItems.dataValues.qty
  const updatedLineItem = await lineItem.update({
    id: req.body.id,
    qty: lineItem.dataValues.qty + req.body.qty,
    productId: req.params.productId,
    orderId: orderId,
  })
  res.send(updatedLineItem)
})

// /api/cart/subtractOne/:userId/:productId - SUBTRACT ONE TO LINE ITEM
// THUNK WRITTEN & WORKING
router.put('/subtractOne/:userId/:productId', async (req, res, next) => {
  console.log('req.params', req.params.userId)
  const orderById = await Order.findOne({
    where: { userId: req.params.userId },
    include: LineItem,
  })
  const lineItem = await LineItem.findOne({
    where: { id: req.params.productId },
  })
  const orderId = orderById.dataValues.id
  const updatedLineItem = await lineItem.update({
    id: req.body.id,
    qty: lineItem.dataValues.qty - 1,
    productId: req.params.productId,
    orderId: orderId,
  })
  res.send(updatedLineItem)
})

module.exports = router
