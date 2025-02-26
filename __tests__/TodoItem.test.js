import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoItem from '../src/components/TodoItem';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { deleteTodo } from '../src/redux/slices/todosSlice';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../src/redux/slices/todosSlice', () => ({
  deleteTodo: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({});

describe('TodoItem Component', () => {
  const mockNavigation = { navigate: jest.fn() };
  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
  });

  const todo = { id: 1, title: 'Test Todo', status: 'pending' };

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TodoItem todo={todo} />
      </Provider>
    );
    expect(getByText('Test Todo')).toBeTruthy();
    expect(getByText('Status: pending')).toBeTruthy();
  });

  it('navigates to edit screen on Edit button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TodoItem todo={todo} />
      </Provider>
    );

    fireEvent.press(getByText('Edit'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateEditTodo', { todo });
  });

  it('navigates to detail screen on View button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TodoItem todo={todo} />
      </Provider>
    );

    fireEvent.press(getByText('View'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('TodoDetail', { todoId: todo.id });
  });

  it('dispatches delete action on Delete button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TodoItem todo={todo} />
      </Provider>
    );

    fireEvent.press(getByText('Delete'));
    expect(deleteTodo).toHaveBeenCalledWith(todo.id);
  });
});
