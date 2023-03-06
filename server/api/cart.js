const router = require('express').Router()
const {
  models: { User, Product, Order, LineItem },
} = require('../db')

// /api/cart - GETS ALL CARTS
router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      include: LineItem,
    })
    console.log(order)
    res.send(order)
  } catch (error) {
    console.log(error)
  }
})

// /api/cart/:userId - GET A SINGLE CART
// THUNK WRITTEN & WORKING
router.get('/:userId', async (req, res, next) => {
  try {
    const orderById = await Order.findOne({
      where: { userId: req.params.userId },
      include: LineItem,
    })
    res.send(orderById)
  } catch (error) {
    console.log(error)
  }
})

// /api/cart/:userId - DELETE A WHOLE CART BY USER ID
// THUNK WRITTEN & WORKING
router.delete('/:userId', async (req, res, next) => {
  try {
    const orderById = await Order.findOne({
      where: { userId: req.params.userId },
      include: LineItem,
    })
    await orderById.destroy()
    res.send(orderById)
  } catch (error) {
    console.log(error)
  }
})

// /api/cart/:userId/:productId - DELETE A LINE ITEM FOR USER CART
// THUNK WRITTEN & WORKING
router.delete('/:orderId/:productId', async (req, res, next) => {
  const orderId = +req.params.orderId
  console.log('ORDER ID', orderId)
  const productId = Number(req.params.productId)
  try {
    const destroyed = await LineItem.destroy({
      where: {
        productId: productId,
        orderId: orderId,
      },
    })
    res.json(destroyed)
  } catch (err) {
    next(err)
  }
})

// /api/cart/:userId/:productId - ADD A LINE ITEM FOR USER CART
// THUNK WRITTEN & WORKING
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    // console.log('req.params', req.params.userId)
    const existingOrder = await Order.findOne({
      where: { userId: req.params.userId },
      include: LineItem,
    })

    // if there's an existing order
    // and that line item doesnt exist by id
    // then create a new line item

    // if there's an existing order
    // and that line item does exist by id
    // update the qty passed in as amount

    if (existingOrder) {
      const orderId = existingOrder.dataValues.id
      // console.log('orderID', orderById.dataValues.id)
      const createLineItem = await LineItem.create({
        qty: req.body.qty,
        productId: req.params.productId,
        orderId: orderId,
      })
      res.send(createLineItem)
    } else {
      const newOrder = await Order.build()
      newOrder.userId = req.params.userId
      await newOrder.save()
      const newLineItem = await LineItem.create({
        productId: req.params.productId,
        orderId: newOrder.dataValues.id,
        qty: req.body.qty,
      })
      res.send(newLineItem)
    }
  } catch (error) {
    console.log(error)
  }
})

// /api/cart/addOne/:userId/:productId - ADD ONE TO LINE ITEM
// THUNK WRITTEN & WORKING
router.put('/addOne/:userId/:productId', async (req, res, next) => {
  try {
    console.log('req.params', req.params)
    const orderById = await Order.findOne({
      where: { userId: req.params.userId },
      include: LineItem,
    })
    const lineItem = await LineItem.findOne({
      where: { productId: req.params.productId },
    })
    const orderId = orderById.dataValues.id
    const updatedLineItem = await lineItem.update({
      // id: req.body.id,
      qty: lineItem.dataValues.qty + 1,
      productId: req.params.productId,
      orderId: orderId,
    })
    res.send(updatedLineItem)
  } catch (error) {
    console.log(error)
  }
})

// /api/cart/addMany/:userId/:productId - ADD MANY TO LINE ITEM
// THUNK WRITTEN & WORKING
router.put('/addMany/:userId/:productId', async (req, res, next) => {
  try {
    // console.log('req.params', req.params.userId)
    const orderById = await Order.findOne({
      where: { userId: req.params.userId },
      include: LineItem,
    })
    if (orderById) {
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
    }
  } catch (error) {
    console.log(error)
  }
})

// /api/cart/subtractOne/:userId/:productId - SUBTRACT ONE FROM LINE ITEM
// THUNK WRITTEN & WORKING
router.put('/subtractOne/:userId/:productId', async (req, res, next) => {
  try {
    // console.log('req.params', req.params.userId)
    const orderById = await Order.findOne({
      where: { userId: req.params.userId },
      include: LineItem,
    })
    const lineItem = await LineItem.findOne({
      where: { productId: req.params.productId },
    })
    const orderId = orderById.dataValues.id
    const updatedLineItem = await lineItem?.update({
      id: req.body.id,
      qty: lineItem.dataValues.qty - 1,
      productId: req.params.productId,
      orderId: orderId,
    })
    res.send(updatedLineItem)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
