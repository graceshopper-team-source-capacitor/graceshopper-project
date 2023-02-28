const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'no-product.jpeg',
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
})

module.exports = Product
