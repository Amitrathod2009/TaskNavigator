import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import store from './src/redux/store';
import { setToken } from './src/redux/slices/authSlice';
import AppNavigator from './src/navigation/AppNavigator';

const linking = {
  prefixes: ['tasknavigator://'],
  config: {
    screens: {
      TodoList: 'todos',
      TodoDetail: 'todo/:todoId',
    },
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <MainApp />
      </NavigationContainer>
    </Provider>
  );
};

const MainApp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('authToken');
      if (savedToken) {
        dispatch(setToken(savedToken));
      }
      setLoading(false);
    };
    loadToken();
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return <AppNavigator testID="app-container" />;
};

export default App;
