import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeleteScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const navigation = useNavigation();

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('@threads_data');
      if (data) setPosts(JSON.parse(data));
    } catch (e) {
      console.log("Error loading data", e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const removePost = (id: string) => {
    // เพิ่ม Alert ยืนยันก่อนลบให้ดูเป็นมืออาชีพ
    Alert.alert(
      "Confirm Delete",
      "คุณแน่ใจใช่ไหมว่าจะลบโพสต์นี้? ลบแล้วกู้คืนไม่ได้นะจ๊ะแม่",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            const filtered = posts.filter((p: any) => p.id !== id);
            await AsyncStorage.setItem('@threads_data', JSON.stringify(filtered));
            setPosts(filtered);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Posts</Text>
        <Text style={styles.subtitle}>{posts.length} Threads</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }: any) => (
          <View style={styles.row}>
            <View style={styles.contentLeft}>
              <Text style={styles.postText} numberOfLines={2}>
                {item.text}
              </Text>
              {item.image && (
                <View style={styles.imageBadge}>
                  <Ionicons name="image-outline" size={12} color="#666" />
                  <Text style={styles.imageBadgeText}> Has image</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              onPress={() => removePost(item.id)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-bin-outline" size={20} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="documents-outline" size={50} color="#333" />
            <Text style={styles.emptyText}>ยังไม่มีโพสต์ให้จัดการจ้า</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { 
    paddingHorizontal: 20, 
    paddingVertical: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#222'
  },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  subtitle: { color: '#666', fontSize: 14, marginTop: 4 },
  row: { 
    flexDirection: 'row', 
    padding: 18, 
    backgroundColor: '#111',
    marginHorizontal: 15,
    marginTop: 12,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#222'
  },
  contentLeft: { flex: 1 },
  postText: { color: '#fff', fontSize: 15, lineHeight: 22 },
  imageBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8,
    backgroundColor: '#1a1a1a',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5
  },
  imageBadgeText: { color: '#666', fontSize: 11 },
  deleteButton: { 
    width: 40, 
    height: 40, 
    backgroundColor: 'rgba(255, 77, 77, 0.1)', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 15
  },
  emptyContainer: { 
    alignItems: 'center', 
    marginTop: 100 
  },
  emptyText: { 
    color: '#333', 
    marginTop: 15, 
    fontSize: 16,
    fontWeight: '600'
  }
});