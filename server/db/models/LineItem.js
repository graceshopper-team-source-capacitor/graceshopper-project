const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = LineItem
