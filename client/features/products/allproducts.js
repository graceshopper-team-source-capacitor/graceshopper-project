import React, { useEffect, useState } from 'react'
import { selectProducts } from './allProductsSlice'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProductsAsync, deleteProductAsync } from './allProductsSlice'
import { me } from '../../../client/app/store'
import AuthForm from '../auth/AuthForm'
import { fetchSingleProductAsync, selectSingleProduct } from './singleProductSlice'
import { addOneToLineItemQty, selectCart } from '../cart/userCartSlice'

const ProductList = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const Navigate = useNavigate()
  const isLoggedIn = useSelector((state) => !!state.auth.me.id)
  const loggedInAdmin = useSelector((state) => !!state.auth.me.isAdmin)

  useEffect(() => {
    dispatch(fetchProductsAsync(products))
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(addOneToLineItemQty({ userId: me.id, productId: itemId, amount }))
  // }, [dispatch])

  const handleDelete = async (id) => {
    await dispatch(deleteProductAsync(id))
    Navigate('/products')
  }

  const handleFilter = async (event) => {
    await dispatch(fetchProductsAsync({ type: event.target.value }))
  }

  console.log("Product", products[0])

  return (
    <div className="productListParentDiv">
      <label>Filter Category:</label>
      <button onClick={handleFilter} value="all">
        All
      </button>
      <button onClick={handleFilter} value="dairy">
        Dairy
      </button>
      <button onClick={handleFilter} value="produce">
        Produce
      </button>
      <button onClick={handleFilter} value="bakery">
        Bakery
      </button>
      <button onClick={handleFilter} value="specialty">
        Snacks
      </button>
      <h1 className="productListHeader">ALL PRODUCTS</h1>
      {loggedInAdmin && (
        <NavLink to={`/addproduct`} className="newProduct">
          + Add New Product
        </NavLink>
      )}
      <div id="productsList">
        {products.map((product) => (
          <div className="productInList" key={product.id}>
            <NavLink to={`/products/${product.id}`}>
              <img src={`/${product.imageUrl}`} className="productListImg" />
            </NavLink>
            <NavLink to={`/products/${product.id}`} className="productNameProductList">
              <h2 className="productNameProductList">{product.name}</h2>
            </NavLink>
            {/* <button onClick={isLoggedIn ? () => userAddToCart : () => guestAddToCart}>Add to Cart</button> */}
            <hr></hr>
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
            {/* <h3>${Number(product.price).toFixed(2)}</h3> */}
          </div>
        ))}
      </div>
    </div>
  )}
// }}



export default ProductList
