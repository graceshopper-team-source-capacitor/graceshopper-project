const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  confirmationNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  cardNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      min: 1000000000,
    },
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Order
