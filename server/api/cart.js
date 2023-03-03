const router = require('express').Router()
const {
  models: { User, Product, Order, LineItem },
} = require('../db')

// GET for a single order for a single user
router.get('/:userId', async (req, res, next) => {
  const orderId = await Order.findOne({
    where: { userId: req.params.userId },
  })
  res.send(orderId)
})

// DELETE the entire user cart
router.delete('/:orderId', async (req, res, next) => {
  const cartId = +req.params.orderId
  try {
    await Order.destroy({ where: { id: cartId } })
    res.json(cartId)
  } catch (err) {
    next(err)
  }
})

//deletes an entire line item from cart
router.delete('/:orderId/:productId', async (req, res, next) => {
  const orderId = +req.params.orderId
  const productId = +req.params.productId
  try {
    await LineItem.destroy({
      where: {
        productId: productId,
        orderId: orderId,
      },
    })
    res.json(productId)
  } catch (err) {
    next(err)
  }
})

//subtract one from line item
router.put('/lineItem/subtract/:lineItemId', async (req, res, next) => {
  try {
    const lineItemId = req.params.lineItemId
    const lineItem = await LineItem.findByPk(lineItemId)
    if (lineItem.dataValues.qty === 1) {
      await LineItem.destroy({ where: { id: lineItemId } })
      res.send('200')
    }
    // console.log(lineItem)
    const updatedQuantity = lineItem.dataValues.qty - 1
    console.log(updatedQuantity)
    res.send(
      await LineItem.update(
        { qty: updatedQuantity },
        {
          where: { id: lineItemId },
        }
      )
    )
  } catch (err) {
    next(err)
  }
})

//add one item to line item
router.put('/lineItem/add/:lineItemId', async (req, res, next) => {
  try {
    const lineItemId = req.params.lineItemId
    const lineItem = await LineItem.findByPk(lineItemId)
    const updatedQuantity = lineItem.dataValues.qty + 1
    console.log(updatedQuantity)
    res.send(
      await LineItem.update(
        { qty: updatedQuantity },
        {
          where: { id: lineItemId },
        }
      )
    )
  } catch (err) {
    next(err)
  }
})

//edits the line Item quantity
router.put('/lineItem/:lineItemId', async (req, res, next) => {
  try {
    console.log(req.params)
    const lineItemId = req.params.lineItemId
    const updatedQuantity = { qty: req.body.qty }
    await LineItem.update(updatedQuantity, {
      where: { id: lineItemId },
    })
    res.send()
  } catch (err) {
    next(err)
  }
})

// when a cart is active and has a line item already in it and we want to add another line item, we need:
// POST route for creating the LineItem
// PUT route for editing the specific Order

//add one whole line item to the cart
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    // if there is an existing order
    // how do we add a new line item in addition to an exisiting line item?
    const existingOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        // also need to make sure its an active cart so we aren't fetching a completed order
        isActiveCart: 'activeCart',
      },
    })
    if (!existingOrder) {
      // we build the new order but it doesn't get an order id until we save it
      const newOrder = await Order.build()
      newOrder.userId = req.params.userId
      // after the save, the order now has an order id
      await newOrder.save()
      // we can create the new line item passing it the product id of the product we are on and the orderId of the order we just created
      // I had to give the LineItem model a default value for qty otherwise it was throwing an error
      // need to figure out how we are capturing the desired qty and passing it to the new line item for creation

      const newLineItem = await LineItem.create({
        productId: req.params.productId,
        orderId: newOrder.dataValues.id,
        qty: req.body.qty,
      })
      res.send(newLineItem)
    } else if (existingOrder) {
      const orderId = existingOrder.dataValues.id

      const additionalLineItem = await LineItem.create({
        productId: req.params.productId,
        orderId: orderId,
        qty: req.body.qty,
      })
      res.send(additionalLineItem)
    }
  } catch (err) {
    console.log(err)
  }
})

// a route for updating an Order to include an additional line item
// router.post("/:orderId/:productId", async (req, res) => {
//   try {
//     const orderId = req.params.orderId;
//     const productId = req.params.productId;

//     await LineItem.build({
//       productId: productId,
//       orderId: orderId,
//     });
//     await LineItem.save();
//   } catch (err) {
//     console.log(err);
//   }
// });

//cart does exist need to create lineitem for cart associated with user
//     const [item, wasCreated] = await OrderItem.findOrCreate({
//       where: {
//         productId: req.params.productId,
//         orderId: useOrderId
//       },
//       defaults: { quantity: req.body.qty }
//     })

//put request
//     // If already exists, update the quantity.
//     if (!wasCreated) {
//       await OrderItem.update({
//         quantity: req.body.qty + item.quantity,
//         productId: req.params.productId,
//         orderId: useOrderId
//       }, {
//         where: {
//           productId: req.params.productId,
//           orderId: useOrderId
//         },
//         returning: true,
//         plain: true
//       })
//     }

//     res.status(201).json(item)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router

//in route for visitor that's where you put the ip address
//
