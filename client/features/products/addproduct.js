import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "./allProductsSlice";

//when adding products without an image, the default image does not show up as the URL
//potentially need to update the product model?

const AddProduct = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addProductAsync({ name, imageUrl, price, description, type }));
    setName("");
    setImage("");
    setPrice("");
    setDescription("");
    setType("");
  };

  return (
    <form id="newProduct" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <label>Product Name:</label>
      <input
        name="ProductName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Product Image:</label>
      <input
        name="ProductimgUrl"
        value={imageUrl}
        onChange={(e) => setImage(e.target.value)}
      />

      <label>Product Price:</label>
      <input
        name="ProductPrice"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>Product Description:</label>
      <input
        name="ProductDescription"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Product Type:</label>
      <input
        name="ProductType"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProduct;
