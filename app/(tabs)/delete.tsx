import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DeleteScreen() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const loadData = async () => {
    const data = await AsyncStorage.getItem('@threads_data');
    if (data) setPosts(JSON.parse(data));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const removePost = async (id: string) => {
    const filtered = posts.filter((p: any) => p.id !== id);
    await AsyncStorage.setItem('@threads_data', JSON.stringify(filtered));
    setPosts(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Posts</Text>
      <FlatList
        data={posts}
        renderItem={({ item }: any) => (
          <View style={styles.row}>
            <Text style={{ flex: 1 }}>{item.text}</Text>
            <TouchableOpacity onPress={() => removePost(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#eee' }
});