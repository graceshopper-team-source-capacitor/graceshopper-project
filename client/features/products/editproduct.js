import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchSingleProductAsync,
  editProductAsync,
  selectSingleProduct,
} from "../products/singleProductSlice";

//when navigating to an edit page for a different product, the name for the last product shows up in the input bar until you refresh, at which point it corrects itself
//if you've edited the value before, the previous value prior to being edited shows up as the default value
//editing perceives the defaultvalue as being an empty string 
//so every single input has to be changed for the submission to go through due to the model's validation for notEmpty: true.
//the updated product also shows up in the api

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
  console.log(product.name, product.imageUrl, product.price)
  return (
    <> 
    <h2>Editing Product</h2>
      {/* <div key={product.id}>
        <h2>Currently Editing: </h2>
        <Link to={`/products/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>
        <p>Price: {product.price}</p>
      </div> */}
      <form onSubmit={handleSubmit} key={product.id}>
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
        <select
          name="type"
          defaultValue={product.type}
          // value={type}
          onChange={(e) => setType(e.target.value)}
        >
        <option value="bakery">Bakery</option>
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="specialty">Specialty</option>
        </select>
        <button type="submit">Edit</button>
      </form>
    </>
  );
};

export default EditProduct;
