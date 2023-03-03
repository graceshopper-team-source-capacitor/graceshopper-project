const router = require('express').Router()
const { models: { User, Product, Order, LineItem }} = require('../db')

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
  }
  catch (err) {
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
        orderId: orderId
      }
    })
    res.json(productId)
  } catch (err) {
    next(err)
  }
})

//subtract one from line item
router.put('/lineItem/subtract/:lineItemId', async (req, res, next) => {
  try {
    const lineItemId = req.params.lineItemId;
    const lineItem = await LineItem.findByPk(lineItemId)
      if (lineItem.dataValues.qty === 1) {
      await LineItem.destroy({where: {id: lineItemId}})
      res.send('200')
    } 
    // console.log(lineItem)
    const updatedQuantity = lineItem.dataValues.qty-1
console.log(updatedQuantity)
    res.send( await LineItem.update( {qty: updatedQuantity}, {
      where: {id: lineItemId}
      }))
  } catch (err) {
    next(err)
  }
})

//add one item to line item
router.put('/lineItem/add/:lineItemId', async (req, res, next) => {
  try {
    const lineItemId = req.params.lineItemId;
    const lineItem = await LineItem.findByPk(lineItemId)
    const updatedQuantity = lineItem.dataValues.qty+1
console.log(updatedQuantity)
    res.send( await LineItem.update( {qty: updatedQuantity}, {
      where: {id: lineItemId}
      }))
  } catch (err) {
    next(err)
  }
})


//edits the line Item quantity
router.put('/lineItem/:lineItemId', async (req, res, next) =>{
  try{
    console.log(req.params)
    const lineItemId = req.params.lineItemId
    const updatedQuantity = {qty: req.body.qty}
    await LineItem.update(updatedQuantity, {
      where: {id: lineItemId}
      })
      res.send()
     } catch(err){
      next(err)
     }
    });

// router.post('/:userId/:productId', async (req, res, next) => {
//   try {
//     let useOrderId;

//     // guest users: Create new order, send orderId with cookie
//     if (req.params.userId === `guest`) {
//       if (req.cookies.orderId) {
//         useOrderId = req.cookies.orderId
//       } else {
//         const guestOrder = await Order.create({ orderStatusCodeId: 1 })
//         res.cookie('orderId', `${guestOrder.id}`)
//         useOrderId = guestOrder.id
//       }
//     } else {
//       // If order with given `userId` && `orderStatusCodeId` of 1 (in-cart) doesn't exist, create new
//       // cart (order) instance and use new `orderId`
//       const existingOrder = await Order.findOne({
//         where: {
//           customerId: req.params.userId,
//           orderStatusCodeId: 1
//         }
//       })

//       if (!existingOrder) {
//         const newOrder = Order.build()
//         newOrder.customerId = req.params.userId
//         newOrder.orderStatusCodeId = 1
//         await newOrder.save()
//         useThisOrderId = newOrder.id
//       } else {
//         useThisOrderId = existingOrder.id
//       }
//     }

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