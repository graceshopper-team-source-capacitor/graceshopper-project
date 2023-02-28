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
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: Sequelize.ENUM('BREAD', 'DAIRY', 'PRODUCE', 'MEAT', 'ETC'),
    allowNull: false,
    defaultValue: 'ECT',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'ECT',
  },
})

module.exports = Product
