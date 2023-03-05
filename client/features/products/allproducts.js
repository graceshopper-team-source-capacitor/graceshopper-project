import React, { useEffect, useState } from 'react'
import { selectProducts } from './allProductsSlice'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProductsAsync, deleteProductAsync } from './allProductsSlice'
import { me } from '../../../client/app/store'
import AuthForm from '../auth/AuthForm'

const ProductList = () => {
  // const location = useLocation()
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const Navigate = useNavigate()
  const loggedInAdmin = useSelector((state) => !!state.auth.me.isAdmin)
  // console.log(useSelector((state) => state.auth.me.isAdmin));

  // const [category, setCategory] = useState("allCategories")

  // const categories =
  // useSelector((state) => {
  //   return state.categories;
  // }) || [];

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  const handleDelete = async (id) => {
    await dispatch(deleteProductAsync(id))
    Navigate('/products')
  }

  const handleFilter = async (event) => {
    await dispatch(fetchProductsAsync({type: event.target.value}))
  }
  

  return (
    <div>
        <label>Filter Category:</label>
        <button onClick={handleFilter} value="all">All</button>
        <button onClick={handleFilter} value="dairy">Dairy</button>
        <button onClick={handleFilter} value="produce">Produce</button>
        <button onClick={handleFilter} value="bakery">Bakery</button>
        <button onClick={handleFilter} value="specialty">Snacks</button>
      <ul id="products">
        {/* The add new product page is rendering the single product page as well? for some reason?*/}
        {loggedInAdmin && (
          <NavLink to={`/addproduct`} className="newProduct">
            Add New Product
          </NavLink>
        )}
        <h2>Currently Available Products</h2>
        {products.map((product) => (
          <li key={product.id}>
            {/* <NavLink
            to={`/Products/${product.id}`}
            key={`All Products: ${product.id}`}
          > */}
            <NavLink to={`/products/${product.id}`}>
              <h2>{product.name}</h2>
            </NavLink>
            {/* </NavLink> */}
            <NavLink to={`/products/${product.id}`} />
            <img src={`/${product.imageUrl}`} />
            {/* vvv These buttons need to be exclusively for the admin. vvv */}
            {loggedInAdmin && (
              <div>
                <button className="delete" onClick={() => handleDelete(product.id)}>
                  X
                </button>
                <NavLink to={`/products/${product.id}/edit`}>
                  <button>Edit</button>
                </NavLink>
              </div>
            )}
            {/* ^^^These buttons need to be exclusively for the admin.^^^ */}
            <h3>${Number(product.price).toFixed(2)}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
