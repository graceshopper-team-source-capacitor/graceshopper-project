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

    return (
        <div>
            <p>{product.name}</p>
        </div>
    )
}

export default Product 