const Sequelize = require('sequelize')
const db = require('../db')

// Order refers to a completed order whereas Cart is a staging area for an Order

const Order = db.define('order', {
  isActiveCart: {
		type: Sequelize.ENUM("activeCart", "completedOrder"),
		defaultValue: "activeCart",
	},
  //isenum is one cart, is one order, then flip once cart becomes order
  confirmationNum: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  cardNum: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    unique: true,
  },
  shippingAddress: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
})

module.exports = Order
