import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';
import CreateEditTodoScreen from '../screens/CreateEditTodoScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="TodoList" component={TodoListScreen} />
          <Stack.Screen name="TodoDetail" component={TodoDetailScreen} />
          <Stack.Screen name="CreateEditTodo" component={CreateEditTodoScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
