//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const LineItem = require('./models/LineItem')

//associations could go here!

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(Product)
Product.belongsTo(Order)

LineItem.belongsTo(Product)
Order.hasMany(LineItem)

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    LineItem,
  },
}
