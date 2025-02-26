import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchUserDetails } from '../redux/slices/authSlice';

const LoginScreen = ({ navigation }) => {
  const [token, setTokenState] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!token.trim()) {
      Alert.alert('Error', 'Token is required');
      return;
    }

    try {
      await dispatch(fetchUserDetails(token));
      navigation.replace('TodoList');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Enter GoRest Token" value={token} onChangeText={setTokenState} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
