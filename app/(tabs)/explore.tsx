import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // ใช้สำหรับเปลี่ยนหน้าในระบบ Expo Router
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddScreen() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  const handlePost = async () => {
    if (!text) return Alert.alert("กรุณากรอกข้อความ");
    
    const newPost = { id: Date.now().toString(), text, image, user: "Charin.yy" };
    const existing = await AsyncStorage.getItem('@threads_data');
    const posts = existing ? JSON.parse(existing) : [];
    
    await AsyncStorage.setItem('@threads_data', JSON.stringify([newPost, ...posts]));
    setText(''); setImage('');
    
    // เปลี่ยนหน้ากลับไปที่ Home 
    router.replace('/'); 
  };

  <View style={styles.container}>
      <Text style={styles.title}>New Thread</Text>
      
      {/* สำหรับพิมพ์ข้อความ (ต้องเชื่อมกับ text และ setText) */}
      <TextInput 
        placeholder="คุณกำลังคิดอะไรอยู่..." 
        style={styles.input} 
        multiline 
        value={text} 
        onChangeText={(value) => setText(value)} 
      />

      {/*สำหรับใส่ลิงก์รูปภาพ (ต้องเชื่อมกับ image และ setImage) */}
      <TextInput 
        placeholder="ลิงก์รูปภาพ (URL)" 
        style={styles.input} 
        value={image} 
        onChangeText={(value) => setImage(value)} 
      />

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, borderColor: '#eee', padding: 10, marginBottom: 20 },
  button: { backgroundColor: 'black', padding: 15, borderRadius: 25, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' }
});