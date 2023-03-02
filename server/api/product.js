const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

//route for all products
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

//edits the product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json(await product.update(req.body))
    }
    catch (err) {
        console.log("There was a problem updating product.", err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      res.send(product);
    } catch (err){
      console.log("Could not delete!", err);
    }
  })

  router.post('/', async (req, res) => {
    try {
      const createdProduct = await Product.create(req.body)
      res.send(createdProduct);
    } catch (err){
      next(err);
    }
  })