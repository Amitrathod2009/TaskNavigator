import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../redux/slices/todosSlice';

const TodoItem = ({ todo }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <Card style={styles.card} testID={`todo-item-${todo.id}`}> 
      <Card.Content>
        <Text style={styles.title} testID={`todo-title-${todo.id}`}>{todo.title}</Text>
        <Text testID={`todo-status-${todo.id}`}>Status: {todo.status}</Text>
      </Card.Content>
      <Card.Actions>
        <Button 
          onPress={() => navigation.navigate('CreateEditTodo', { todo })}
          testID={`edit-button-${todo.id}`} 
        >
          Edit
        </Button>
        <Button 
          color="red" 
          onPress={handleDelete}
          testID={`delete-button-${todo.id}`}
        >
          Delete
        </Button>
        <Button 
          onPress={() => navigation.navigate('TodoDetail', { todoId: todo.id })}
          testID={`view-button-${todo.id}`} 
        >
          View
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 10, elevation: 3, backgroundColor: 'white', borderRadius: 8, padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

export default TodoItem;
