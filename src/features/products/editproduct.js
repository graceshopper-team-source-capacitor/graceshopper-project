import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  fetchSingleProductAsync,
  editProductAsync,
  selectSingleProduct,
} from '../products/singleProductSlice'

const EditProduct = () => {
  const dispatch = useDispatch()
  const productObject = useSelector(selectSingleProduct)
  const productId = useParams().id
  console.log(productId)

  const Navigate = useNavigate()

  const [name, setName] = useState('')
  const [imageUrl, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId))
  }, [dispatch, productId])
  console.log(productId)

  useEffect(() => {
    setName(productObject.name)
    setImage(productObject.imageUrl)
    setPrice(productObject.price)
    setDescription(productObject.description)
    setType(productObject.type)
  }, [productObject])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await dispatch(
      editProductAsync({
        id: productId,
        name,
        imageUrl,
        price,
        description,
        type,
      })
    )
    Navigate(`/products`)
  }

  const product = productObject
  console.log(product.name, product.imageUrl, product.price)
  return (
    <div className="editProductParentDiv" key={product.id}>
      <h2 className="addProductH2">Currently Editing: </h2>
      <Link to={`/products/${product.id}`}>
        <h2 className="currEditProduct">{product.name}</h2>
      </Link>
      <p className="currEditProduct">Price: ${Number(product.price).toFixed(2)}</p>

      <form id="editProduct" onSubmit={handleSubmit}>
        <label className="formLabelPadded">Product Name:</label>
        <input
          name="name"
          defaultValue={product.name}
          // value={name}
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          className="formInput"
        />

        <label className="formLabelPadded">Product Image:</label>
        <input
          name="ProductimgUrl"
          defaultValue={product.imageUrl}
          // value={imageUrl}
          onChange={(e) => setImage(e.target.value)}
          className="formInput"
        />

        <label className="formLabelPadded">Product Price:</label>
        <input
          name="price"
          defaultValue={product.price}
          // value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="formInput"
        />

        <label className="formLabelPadded">Product Description:</label>
        <input
          name="ProductDescription"
          defaultValue={product.description}
          // value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="formInput"
        />

        <label className="formLabelPadded">Product Type:</label>
        <select
          className="productTypeDropDown"
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
        <button type="submit" className="addProductSubmit">
          Edit
        </button>
      </form>
    </div>
  )
}
export default EditProduct
