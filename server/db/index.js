//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const LineItem = require('./models/LineItem')
const Cart = require('./models/Cart')

//associations could go here!

// What if the order and cart were the same thing? The difference is whether or not you've checked out 
// consider it a cart if the checked out flag is false (or something like isActiveCart)
  // if it has been checked out, then its an order
  // if it hasn't been checked out, then its still a cart 
// make sure an order doesn't already exist for a user

// focus on storing the cart in local storage 

// A belongs to many B and B belongs to many A 
// Product belongs to many order, order has many product 
Product.belongsToMany(Order, { through: LineItem}) 

User.hasMany(Order)

LineItem.belongsTo(Product)
Order.belongsTo(User)
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
