const Sequelize = require('sequelize')
const db = require('../db')

// Cart has LineItems and a LineItem creates a pointer to a Product id, and holds a qty of the given Product

const Cart = db.define('cart', {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = Cart