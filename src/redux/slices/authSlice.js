import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://gorest.co.in/public/v2/users';

export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = response.data[0];
  if (!user) {throw new Error('User not found');}

  await AsyncStorage.setItem('user_id', user.id.toString());
  return { token, user_id: user.id };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user_id: null },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user_id = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user_id');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
