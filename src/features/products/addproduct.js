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
    <div className="newProductParentDiv">
      <h2 className="addProductH2">Add a New Product</h2>
      <form id="newProduct" onSubmit={handleSubmit}>
        <label className="formLabelPadded">Product Name:</label>
        <input
          name="ProductName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="formInput"
        />

        <label className="formLabelPadded">Product Image:</label>
        <input
          name="ProductimgUrl"
          value={imageUrl}
          onChange={(e) => setImage(e.target.value)}
          className="formInput"
        />

        <label className="formLabelPadded">Product Price:</label>
        <input
          name="ProductPrice"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="formInput"
        />

        <label className="formLabelPadded">Product Description:</label>
        <input
          name="ProductDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="formInput"
        />

        <label className="formLabelPadded">Product Type:</label>
        <input
          name="ProductType"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="formInput"
        />
        <button type="submit" className="addProductSubmit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
