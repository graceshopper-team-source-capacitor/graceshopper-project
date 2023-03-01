import React, { useEffect } from 'react';
import { fetchSingleProductAsync, selectSingleProduct } from './singleProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Product = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const product = useSelector(selectSingleProduct); 

    useEffect(() => {
        dispatch(fetchSingleProductAsync(id));
    }, [dispatch]);

    console.log(product.imageUrl)
    return (
        <div>
            {/* <img src={`../../../public/${product.imageUrl}`}/> */}
            <img src="bakery1.jpg"/>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.type}</p>
            <p>{product.description}</p>
        </div>
    )
}

export default Product 