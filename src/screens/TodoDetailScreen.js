import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../api';

export default function TodoDetailScreen() {
  const route = useRoute();
  const { todoId } = route.params || {}; 

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Received todoId:', todoId);

    if (!todoId) {
      setError('Invalid Todo ID');
      setLoading(false);
      return;
    }

    api.get(`/todos/${todoId}`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((err) => {
        console.error('Error fetching to-do:', err.response?.data || err.message);
        setError('Failed to fetch to-do details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [todoId]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  }
  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-do Details</Text>
      <Text style={styles.text}>🆔 ID: {todo.id}</Text>
      <Text style={styles.text}>📌 Title: {todo.title}</Text>
      <Text style={styles.text}>✅ Status: {todo.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loader: { marginTop: 20 },
  error: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 18, marginVertical: 5 },
});
