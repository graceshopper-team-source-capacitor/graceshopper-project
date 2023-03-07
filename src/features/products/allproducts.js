import React, { useEffect, useState } from 'react'
import { selectProducts } from './allProductsSlice'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProductsAsync, deleteProductAsync } from './allProductsSlice'
import { me } from '../../app/store'
import AuthForm from '../auth/AuthForm'
import { addLineItemForUserCart, addOneToLineItemQty, selectCart } from '../cart/userCartSlice'
import { selectSingleProduct } from './singleProductSlice'

const ProductList = () => {
  // const location = useLocation()
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const product = useSelector(selectSingleProduct)
  const Navigate = useNavigate()
  const fetchedCart = useSelector(selectCart)
  const loggedInAdmin = useSelector((state) => !!state.auth.me.isAdmin)
  const me = useSelector((state) => state.auth.me)
  const isLoggedIn = useSelector((state) => !!state.auth.me.id)
  const [amount, setAmount] = useState(1)
  const [cart, setCart] = useState([])
  // console.log(useSelector((state) => state.auth.me.isAdmin));

  // const [category, setCategory] = useState("allCategories")

  // const categories =
  // useSelector((state) => {
  //   return state.categories;
  // }) || [];

  useEffect(() => {
    try {
      // USER CART READS AND WRITES FROM/TO LOCAL STORAGE
      // IF LOGGED IN, SET LS CART TO DB CART
      // IF NOT LOGGED IN CONTINUE BELOW
      let localCart = localStorage.getItem('cart') || ''
      // convert cart into json because local storage can only read strings & primative types
      let jsonCart = JSON.parse(localCart)
      if (localCart) setCart(jsonCart)
    } catch (err) {}
  }, [])

  // when cart updates set cart local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    dispatch(fetchProductsAsync(products))
  }, [dispatch])

  const handleDelete = async (id) => {
    await dispatch(deleteProductAsync(id))
    Navigate('/products')
  }

  // const handleEdit = async (id) => {
  //   await dispatch(editProductAsync(id))
  // }

  const handleFilter = async (event) => {
    await dispatch(fetchProductsAsync({ type: event.target.value }))
  }

  console.log('Product', products[0])

  function lineItemProductIdsArrayFunc() {
    const productIdArr = []
    for (let i = 0; i < fetchedCart.lineItems?.length; i++) {
      productIdArr.push(fetchedCart.lineItems[i].productId)
    }
    return productIdArr
  }

  const lineItemProductIdsArray = lineItemProductIdsArrayFunc()

  function loggedInAdd(id) {
    console.log('logged in added')
    if (lineItemProductIdsArray.includes(id)) {
      if (amount === 1) {
        dispatch(addOneToLineItemQty({ userId: me.id, productId: id, amount }))
      }
    } else {
      //if there's not already a line item, create a line item with the qty
      dispatch(addLineItemForUserCart({ userId: me.id, productId: id, amount }))
      console.log('fetched cart', fetchedCart)
    }
  }

  function guestAdd(product, amount) {
    console.log('guest added')
    const itemAlreadyInCart = cart.find((cartItem) => cartItem.id === product.id)
    // returns the product object index if it exists in the local storage cart
    const itemAlreadyInCartIndex = cart.findIndex((cartItem) => cartItem.id === product.id)

    // the product object plus a new key value pair of quanity of product
    const addedItem = { ...product, qty: amount }

    if (cart.length === 0) {
      setCart([addedItem])
    } else if (cart.length > 0) {
      //if the item does not already exist in the local storage cart
      if (itemAlreadyInCart === undefined) {
        const newCart = [...cart, addedItem]
        // add that item to the local storage cart
        setCart(newCart)
      } else {
        // if the item already exists in local storage cart, update the quantity
        cart[itemAlreadyInCartIndex].qty = itemAlreadyInCart.qty + amount
        setCart([...cart])
      }
    }
  }

  return (
    <div className="productListParentDiv">
      <div className="sortSideMenu">
        <h1 className="productListHeader">ALL PRODUCTS</h1>
        {loggedInAdmin && (
          <NavLink to={`/addproduct`} className="newProduct">
            + Add New Product
          </NavLink>
        )}
        <button className="sortByAllButton" onClick={handleFilter} value="all">
          All
        </button>
        <button className="sortByDairyButton" onClick={handleFilter} value="dairy">
          Dairy
        </button>
        <button className="sortByProduceButton" onClick={handleFilter} value="produce">
          Produce
        </button>
        <button className="sortByBakeryButton" onClick={handleFilter} value="bakery">
          Bakery
        </button>
        <button className="sortBySpecialtyButton" onClick={handleFilter} value="specialty">
          Snacks
        </button>
      </div>

      <div id="productsList">
        {products.map((product) => (
          <div className="productInList" key={product.id}>
            <NavLink to={`/products/${product.id}`}>
              <img src={`/${product.imageUrl}`} className="productListImg" />
            </NavLink>
            <NavLink to={`/products/${product.id}`} className="productNameProductList">
              <h2 className="productNameProductList">{product.name}</h2>
            </NavLink>
            {isLoggedIn ? (
              <button onClick={() => loggedInAdd(product.id)}>Add One</button>
            ) : (
              <button onClick={() => guestAdd(product, amount)}>Add One</button>
            )}
            <hr></hr>
            {/* vvv These buttons need to be exclusively for the admin. vvv */}
            {loggedInAdmin && (
              <div>
                <div className="deleteEditButtonsDiv">
                  <NavLink to={`/products/${product.id}/edit`}>
                    <button className="edit">Edit</button>
                  </NavLink>
                  <button className="delete" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
            {/* ^^^These buttons need to be exclusively for the admin.^^^ */}
            {/* <h3>${Number(product.price).toFixed(2)}</h3> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
