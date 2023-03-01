import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// thunk for fetching a single student, based on id
export const fetchSingleProductAsync = createAsyncThunk("products/fetchById", async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    console.log('data:', data);
    return data; 
});

export const singleProductSlice = createSlice({
    name: "singleProduct",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            return action.payload 
        });
    }
});


export const selectSingleProduct = (state) => state.singleProduct;

export default singleProductSlice.reducer; 