import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://gorest.co.in/public/v2/todos';


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { getState }) => {
  const { token, user_id } = getState().auth;
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data.filter(todo => todo.user_id === user_id);
});


export const fetchTodoById = createAsyncThunk('todos/fetchTodoById', async (id, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.get(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});


export const addTodo = createAsyncThunk('todos/addTodo', async (todo, { getState }) => {
  const { token, user_id } = getState().auth;
  const response = await axios.post(API_URL, { ...todo, user_id }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});


export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, title, status }, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.patch(`${API_URL}/${id}`, { title, status }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});


export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, { getState }) => {
  const { token } = getState().auth;
  await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(addTodo.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.list.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {state.list[index] = action.payload;}
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
