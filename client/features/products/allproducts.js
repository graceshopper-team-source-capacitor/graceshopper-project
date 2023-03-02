import React, { useEffect } from "react";
import { selectProducts } from "./allProductsSlice";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsAsync, deleteProductAsync } from "./allProductsSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

    const handleDelete = async (id) => {
      await dispatch(deleteProductAsync(id));
      Navigate("/products");
    };

  return (
    <div>
      <ul id="products">
        {/* vvv The new product button needs to be exclusively for the admin. vvv */}
        <NavLink to={`/products/new`} className="newProduct">Add New Product</NavLink>
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
            <NavLink to={`/products/${product.id}`}>
            <img src={`/${product.imageUrl}`} />
            {/* vvv These buttons need to be exclusively for the admin. vvv */}
            <button className="delete" onClick={() => handleDelete(product.id)}>X</button> 
            <NavLink to={`/products/${product.id}/edit`}>
              <button>Edit</button>
            </NavLink>
            {/* ^^^These buttons need to be exclusively for the admin.^^^ */}
            <h3>{product.price}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
