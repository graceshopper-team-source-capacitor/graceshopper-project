const Sequelize = require('sequelize')
const db = require('../db')

// A LineItem creates a pointer to a Product id, and holds a qty of the given Product
// Can think of it as a Product + a qty of said Product

const LineItem = db.define('lineItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
})

module.exports = LineItem
