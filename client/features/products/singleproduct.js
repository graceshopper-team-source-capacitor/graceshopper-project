import React, { useEffect, useState } from 'react';
import { fetchSingleProductAsync, selectSingleProduct } from './singleProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Product = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const product = useSelector(selectSingleProduct);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        dispatch(fetchSingleProductAsync(id));
    }, [dispatch]);

    const subtractFromAmount = () => {
        setAmount(amount -1);
    };

    const addToAmount = () => {
        setAmount(amount +1);
    };

    return (
        <div>
            <img src={`/${product.imageUrl}`} />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.type}</p>
            <p>{product.description}</p>
                <button onClick={subtractFromAmount}>-</button>
                <p>{amount}</p>
                <button onClick={addToAmount}>+</button>
            <button onClick={() => {console.log("add to cart btn clicked")}}>Add to Cart</button>
        </div>
    )
}

export default Product 