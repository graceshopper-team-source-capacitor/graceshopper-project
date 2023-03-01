const router = require('express').Router()
const {
  models: { User, Order },
} = require('../db')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const userById = await User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: Order,
          as: 'orders',
        },
      ],
    })
    res.send(userById)
  } catch (error) {
    next(error)
  }
})
