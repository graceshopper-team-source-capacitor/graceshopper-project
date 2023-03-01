const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
      res.send(await Product.findAll({
          // include: {
          //     model: Tag
          // }
      }));
  } catch (error) {
      next(error);
  }
});

// a route to serve up a single product, based on id (GET api/products/:id) 
router.get('/:id', async (req, res) => {
  try {
      res.send(await Product.findByPk(req.params.id))
  }
  catch (err) {
      console.log("There was a problem fetching the product.", err)
  }
})