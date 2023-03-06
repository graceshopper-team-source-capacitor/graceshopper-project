import React, { useEffect, useState } from 'react'
import { selectProducts } from './allProductsSlice'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProductsAsync, deleteProductAsync } from './allProductsSlice'
import { me } from '../../../client/app/store'
import AuthForm from '../auth/AuthForm'
import { editProductAsync } from './singleProductSlice'

//editing a product requires you to refresh to see changes
//however, deleting goes into immediate effect?
//changes are going through to the database
//when category is changed, order in which is is inserted into the line up is random despite the ID not changing
//the updated product also shows up in the api
//the product that was edited shows up as the old product name even after being edited.
//"Cannot read properties of undefined (reading 'type')"
//edited data shows up in the edit page + input boxes, but do not update the list even upon refresh

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
  }, [dispatch, products])

  const handleDelete = async (id) => {
    await dispatch(deleteProductAsync(id))
    Navigate('/products')
  }

  // const handleEdit = async (id) => {
  //   await dispatch(editProductAsync(id))
  // }

  const handleFilter = async (event) => {
    await dispatch(fetchProductsAsync({type: event.target.value}))
  }
  
  console.log("Product", products[0])

  return (
    <div>
        <label>Filter Category:</label>
        <button onClick={handleFilter} value="all">All</button>
        <button onClick={handleFilter} value="dairy">Dairy</button>
        <button onClick={handleFilter} value="produce">Produce</button>
        <button onClick={handleFilter} value="bakery">Bakery</button>
        <button onClick={handleFilter} value="specialty">Snacks</button>
      <ul id="products">
        {loggedInAdmin && (
          <NavLink to={`/addproduct`} className="newProduct">
            Add New Product
          </NavLink>
        )}
        <h2>Currently Available Products</h2>
        {products.map((product) => (
          <li key={product.id}>
            <NavLink to={`/products/${product.id}`}>
              <h2>{product.name}</h2>
            </NavLink>
            <NavLink to={`/products/${product.id}`} />
            <img src={`/${product.imageUrl}`} />
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
            <h3>${Number(product.price).toFixed(2)}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
