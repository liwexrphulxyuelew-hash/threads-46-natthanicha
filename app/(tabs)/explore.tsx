import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; 
import React, { useState } from 'react';
import { 
  Alert, StyleSheet, Text, TextInput, TouchableOpacity, 
  View, KeyboardAvoidingView, Platform, ScrollView, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddScreen() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  const handlePost = async () => {
    if (!text) return Alert.alert("กรุณากรอกข้อความ");

    const newPost = { 
      id: Date.now().toString(), 
      text, 
      image, 
      user: "Charin.yy",
      likes: 0 
    };

    const existing = await AsyncStorage.getItem('@threads_data');
    const posts = existing ? JSON.parse(existing) : [];
    
    await AsyncStorage.setItem('@threads_data', JSON.stringify([newPost, ...posts]));
    setText(''); 
    setImage('');
    
    router.replace('/'); 
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New thread</Text>
        <View style={{ width: 50 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          {/* ฝั่งซ้าย: รูปโปรไฟล์และเส้น Thread */}
          <View style={styles.leftColumn}>
            <Image 
              source={{ uri: "https://i.pinimg.com/736x/10/5b/17/105b17a321eff97eeff9eb837c6d7779.jpg" }} 
              style={styles.avatar} 
            />
            <View style={styles.verticalLine} />
          </View>

          {/* ฝั่งขวา: ช่องพิมพ์ข้อความ */}
          <View style={styles.rightColumn}>
            <Text style={styles.username}>Charin.yy</Text>
            
            <TextInput 
              placeholder="คุณกำลังคิดอะไรอยู่..." 
              placeholderTextColor="#555"
              style={styles.input} 
              multiline 
              value={text} 
              onChangeText={(value) => setText(value)} 
              autoFocus
            />

            <TextInput 
              placeholder="วางลิงก์รูปภาพที่นี่ (URL)..." 
              placeholderTextColor="#444"
              style={styles.imageInput} 
              value={image} 
              onChangeText={(value) => setImage(value)} 
            />

            {/* ไอคอนด้านล่างช่องพิมพ์ */}
            <View style={styles.iconBar}>
              <Ionicons name="images-outline" size={20} color="#666" style={styles.bottomIcon} />
              <Ionicons name="camera-outline" size={20} color="#666" style={styles.bottomIcon} />
              <Ionicons name="mic-outline" size={20} color="#666" style={styles.bottomIcon} />
              <Ionicons name="list-outline" size={20} color="#666" style={styles.bottomIcon} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ปุ่ม Post ด้านล่างสุด */}
      <View style={styles.footer}>
        <Text style={styles.footerNote}>Anyone can reply</Text>
        <TouchableOpacity 
          style={[styles.postButton, { opacity: text ? 1 : 0.5 }]} 
          onPress={handlePost}
          disabled={!text}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: '#222'
  },
  cancelText: { color: '#fff', fontSize: 16 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  contentContainer: { flexDirection: 'row', padding: 20 },
  leftColumn: { alignItems: 'center', marginRight: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  verticalLine: { width: 2, flex: 1, backgroundColor: '#222', marginTop: 10, borderRadius: 1 },
  rightColumn: { flex: 1 },
  username: { color: '#fff', fontWeight: '700', fontSize: 16, marginBottom: 5 },
  input: { color: '#fff', fontSize: 16, minHeight: 40, textAlignVertical: 'top' },
  imageInput: { color: '#888', fontSize: 14, marginTop: 10 },
  iconBar: { flexDirection: 'row', marginTop: 20 },
  bottomIcon: { marginRight: 15 },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20,
    borderTopWidth: 0.2,
    borderTopColor: '#222'
  },
  footerNote: { color: '#555', fontSize: 14 },
  postButton: { 
    backgroundColor: '#fff', 
    paddingHorizontal: 20, 
    paddingVertical: 8, 
    borderRadius: 20 
  },
  postButtonText: { color: '#000', fontWeight: '700', fontSize: 15 }
});