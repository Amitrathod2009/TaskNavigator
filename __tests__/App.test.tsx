/**
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import store from '../src/redux/store';
import App from '../App';

test('renders App correctly', async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );

  // You can add more checks here (e.g., if the login screen is shown initially)
  expect(getByTestId('app-container')).toBeTruthy();
});
