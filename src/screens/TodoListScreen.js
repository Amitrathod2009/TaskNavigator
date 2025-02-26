import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../redux/slices/todosSlice';

const TodoListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <View style={styles.container} testID="todo-list-screen">
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('CreateEditTodo')}
        style={styles.addButton}
        testID="add-todo-button" 
      >
        Add Todo
      </Button>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Status: {item.status}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  addButton: { marginBottom: 16 },
  card: { marginBottom: 10, elevation: 3, backgroundColor: 'white', borderRadius: 8, padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

export default TodoListScreen;
