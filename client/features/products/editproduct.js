import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchSingleProductAsync,
  editProductAsync,
  selectSingleProduct,
} from "../products/singleProductSlice";

//unable to access edit page
//api is not accessible either

const EditProduct = () => {
  const dispatch = useDispatch();
  const productObject = useSelector(selectSingleProduct);
  const productId = useParams().id;
  console.log(productId);

  const Navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageUrl, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch, productId]);
  console.log(productId);

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

  const product = productObject;
  console.log(product);
  return (
    <div className="editProductParentDiv">
      <h2 className="editProductH2">Currently Editing: </h2>
      <div key={product.id}>
        <Link to={`/products/${product.id}`}>
          <h2 className="currEditProduct">{product.name}</h2>
        </Link>
        <p className="currEditProduct">
          Price: ${Number(product.price).toFixed(2)}
        </p>
      </div>
      <form id="editProduct" onSubmit={handleSubmit}>
        <label className="formLabelPadded">Product Name:</label>
        <input
          name="name"
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
          name="price"
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
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="formInput"
        />

        <button type="submit" className="editProductSubmit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
