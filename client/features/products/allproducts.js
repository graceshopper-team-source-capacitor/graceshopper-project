import React, { useEffect } from 'react'
import { selectProducts } from './allProductsSlice'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProductsAsync } from './allProductsSlice'

const ProductList = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const Navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  //   const handleDelete = async (id) => {
  //     await dispatch(deleteProductAsync(id));
  //     Navigate("/allproducts");
  //   };
  //   const handleDelete = async (id) => {
  //     await dispatch(deleteProductAsync(id));
  //     Navigate("/allproducts");

  return (
    <div>
      <ul id="products">
        {/* <NavLink to={`/products/new`} className="newProduct">Add New Product</NavLink> */}
        <h2>Currently Available Products</h2>
        {products.map((product) => (
          <li key={product.id}>
            {/* <button className="delete" onClick={() => handleDelete(product.id)}>X</button> */}
            {/* <NavLink
            to={`/Products/${product.id}`}
            key={`All Products: ${product.id}`}
          > */}
            <h2>{product.name}</h2>
            {/* </NavLink> */}
            {/* <img className="Product" src={product.imageUrl} /> */}
            {/* <NavLink to={`/allproducts/${product.id}/edit`}>
            <button>Edit</button>
          </NavLink> */}
            <h3>{product.price}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
