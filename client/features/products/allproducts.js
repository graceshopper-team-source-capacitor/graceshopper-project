import React, { useEffect } from "react";
import { selectProducts } from "./allProductsSlice";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsAsync, deleteProductAsync } from "./allProductsSlice";
import { me } from "../../../client/app/store";
import AuthForm from "../auth/AuthForm";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const Navigate = useNavigate();
  const loggedInAdmin = useSelector((state) => !!state.auth.me.isAdmin);
  console.log(useSelector((state) => state.auth.me.isAdmin));

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteProductAsync(id));
    Navigate("/products");
  };

  return (
    <div className="productListParentDiv">
      <h1 className="productListHeader">ALL PRODUCTS</h1>
      {loggedInAdmin && (
        <NavLink to={`/addproduct`} className="newProduct">
          Add New Product
        </NavLink>
      )}
      <div id="productsList">
        {products.map((product) => (
          <div className="productInList" key={product.id}>
            <NavLink to={`/products/${product.id}`}>
              <img src={`/${product.imageUrl}`} className="productListImg" />
            </NavLink>
            <NavLink
              to={`/products/${product.id}`}
              className="productNameProductList"
            >
              <h2 className="productNameProductList">{product.name}</h2>
            </NavLink>
            <hr></hr>
            {/* vvv These buttons need to be exclusively for the admin. vvv */}
            {loggedInAdmin && (
              <div>
                <button
                  className="delete"
                  onClick={() => handleDelete(product.id)}
                >
                  X
                </button>
                <NavLink to={`/products/${product.id}/edit`}>
                  <button>Edit</button>
                </NavLink>
              </div>
            )}
            {/* ^^^These buttons need to be exclusively for the admin.^^^ */}
            {/* <h3>${Number(product.price).toFixed(2)}</h3> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
