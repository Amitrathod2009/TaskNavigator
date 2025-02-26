import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../redux/slices/todosSlice';

const CreateEditTodoScreen = ({ navigation, route }) => {
  const { todo } = route.params || {};
  const [title, setTitle] = useState(todo?.title || '');
  const [status, setStatus] = useState(todo?.status || 'pending');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (!title.trim()) return;

    const newTodo = { id: todo?.id, title, status, user_id: 7721764 };

    if (todo) {
      dispatch(editTodo(newTodo));
    } else {
      dispatch(addTodo(newTodo));
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <Picker selectedValue={status} onValueChange={setStatus}>
        <Picker.Item label="Pending" value="pending" />
        <Picker.Item label="Completed" value="completed" />
      </Picker>
      <Button mode="contained" onPress={handleSave}>Save</Button>
    </View>
  );
};

const styles = StyleSheet.create({ container: { padding: 20 } });

export default CreateEditTodoScreen;
