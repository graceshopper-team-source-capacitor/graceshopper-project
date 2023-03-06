import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchSingleProductAsync,
  editProductAsync,
  selectSingleProduct,
} from "../products/singleProductSlice";


const EditProduct = () => {
  const dispatch = useDispatch();
  const productObject = useSelector(selectSingleProduct);
  const productId = useParams().id;
  console.log(productId)

  const Navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageUrl, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch, productId]); console.log(productId)

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(
      editProductAsync({
        id: productId,
        name,
        imageUrl,
        price,
        description,
        type,
      })
    );
    Navigate(`/products`);
  };

  const product  = productObject;
  console.log(product)
  return (
    <> 
      <div key={product.id}>
        <h2>Currently Editing: </h2>
        <Link to={`/products/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>
        <p>Price: {product.price}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          name="name"
          defaultValue={product.name}
          // value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Product Image:</label>
        <input
          name="ProductimgUrl"
          defaultValue={product.imageUrl}
          // value={imageUrl}
          onChange={(e) => setImage(e.target.value)}
        />

        <label>Product Price:</label>
        <input
          name="price"
          defaultValue={product.price}
          // value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Product Description:</label>
        <input
          name="ProductDescription"
          defaultValue={product.description}
          // value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Product Type:</label>
        <input
          name="type"
          defaultValue={product.type}
          // value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <button type="submit">Edit</button>
      </form>
    </>
  );
};

export default EditProduct;
