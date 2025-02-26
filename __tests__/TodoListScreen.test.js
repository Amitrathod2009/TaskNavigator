import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoListScreen from '../src/screens/TodoListScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fetchTodos } from '../src/redux/slices/todosSlice';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../src/redux/slices/todosSlice', () => ({
  fetchTodos: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({
  todos: { list: [{ id: 1, title: 'Todo 1', status: 'pending' }] },
});

describe('TodoListScreen', () => {
  const mockNavigation = { navigate: jest.fn() };
  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
  });

  it('fetches todos on mount', () => {
    render(
      <Provider store={store}>
        <TodoListScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(fetchTodos).toHaveBeenCalled();
  });

  it('displays a list of todos', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TodoListScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(getByText('Todo 1')).toBeTruthy();
    expect(getByText('Status: pending')).toBeTruthy();
  });

  it('navigates to CreateEditTodo on Add button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TodoListScreen navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.press(getByText('Add Todo'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateEditTodo');
  });
});
