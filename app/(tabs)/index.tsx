import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<any[]>([]);

  //ดึงข้อมูลจาก AsyncStorage
  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('@threads_data');
      if (data) {
        setPosts(JSON.parse(data));
      }
    } catch (e) {
      console.log("Error loading data", e);
    }
  };

  // ให้ทำงานทุกครั้งที่หน้าจอนี้ถูกเปิด (Focus)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const renderHeader = () => (
    <View style={{ padding: 15 }}>
      {/* ส่วนบน: ชื่อและรูปโปรไฟล์ */}
      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Charin.yy</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 15 }}>rin 🍒</Text>
            <View style={styles.badge}>
              <Text style={{ fontSize: 12, color: '#999' }}>threads.net</Text>
            </View>
          </View>
        </View>
        <Image 
          source={{ uri: "https://i.pinimg.com/736x/7b/ab/db/7babdbf9b2dc55bafbde9a5c0b4d29be.jpg" }} 
          style={{ width: 70, height: 70, borderRadius: 35 }} 
        />
      </View>

      {/* Bio */}
      <Text style={{ marginTop: 15, fontSize: 16 }}>知らぬが仏。</Text>
      <Text style={{ marginTop: 5, color: "#db6e80", fontWeight: '500' }}>1:25 | 🐰🎨 🎧</Text>
      
      <Text style={{ marginTop: 15, color: '#999' }}>100K followers</Text>

      {/* ปุ่มกด */}
      <View style={{ flexDirection: 'row', marginTop: 15 }}>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={{ fontWeight: '600' }}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={{ fontWeight: '600' }}>Share profile</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabWrapper}>
        <View style={styles.activeTab}>
          <Text style={{ fontWeight: 'bold' }}>Threads</Text>
        </View>
        <View style={styles.inactiveTab}>
          <Text style={{ color: '#999', fontWeight: 'bold' }}>Replies</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.threadCard}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: "https://i.pinimg.com/736x/10/5b/17/105b17a321eff97eeff9eb837c6d7779.jpg" }} style={styles.smallAvatar} />
                <View style={styles.threadLine} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Charin.yy</Text>
                <Text style={{ fontSize: 15, marginTop: 2 }}>{item.text}</Text>
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.postImage} />
                )}
                <View style={styles.iconRow}>
                  <Ionicons name="heart-outline" size={20} style={styles.icon} />
                  <Ionicons name="chatbubble-outline" size={18} style={styles.icon} />
                  <Ionicons name="repeat-outline" size={20} style={styles.icon} />
                  <Ionicons name="paper-plane-outline" size={20} style={styles.icon} />
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  badge: { backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: 8, marginLeft: 5 },
  outlineButton: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingVertical: 8, alignItems: 'center', marginHorizontal: 5 },
  tabWrapper: { flexDirection: 'row', marginTop: 20, borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
  activeTab: { flex: 1, alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1.5, borderBottomColor: 'black' },
  inactiveTab: { flex: 1, alignItems: 'center', paddingBottom: 10 },
  threadCard: { padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  smallAvatar: { width: 35, height: 35, borderRadius: 17.5 },
  threadLine: { width: 2, flex: 1, backgroundColor: '#eee', marginVertical: 5 },
  postImage: { width: '100%', height: 250, borderRadius: 10, marginTop: 10 },
  iconRow: { flexDirection: 'row', marginTop: 15 },
  icon: { marginRight: 15 }
});