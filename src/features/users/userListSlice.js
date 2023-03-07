import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsersAsync = createAsyncThunk('users', async () => {
  const { data } = await axios.get('/api/users')
  console.log('axios', data)
  return data
})

// export const addUserAsync = createAsyncThunk(
//   "users/new",
//   async ({ name, imageUrl, price, type, description }) => {
//     const { data } = await axios.post("/api/users", {
//       name,
//       imageUrl,
//       price,
//       type,
//       description,
//     });
//     return data;
//   }
// );

// export const deleteUserAsync = createAsyncThunk(
//   "users/deleteuser",
//   async (id) => {
//     const { data } = await axios.delete(`/api/users/${id}`);
//     return data;
//   }
// );

export const UsersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      return action.payload
    })
    // builder.addCase(addUserAsync.fulfilled, (state, action) => {
    //   state.push(action.payload);
    // });
    // builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
    //   const newState = state.filter(
    //     (user) => user.id !== action.payload.id
    //   );
    //   return newState;
    // });
  },
})

export const selectUsers = (state) => state.users

export default UsersSlice.reducer;