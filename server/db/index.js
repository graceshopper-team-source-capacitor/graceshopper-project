//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Checkout = require('./models/Checkout')

//associations could go here!

User.hasMany(Checkout)
Checkout.belongsTo(User)

Checkout.hasMany(Product)
Product.belongsTo(Checkout)

module.exports = {
  db,
  models: {
    User,
    Product,
    Checkout,
  },
}
