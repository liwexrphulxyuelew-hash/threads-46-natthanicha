import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'black', // สีไอคอนตอนที่กดเลือก
      headerShown: true,             // แสดงชื่อหัวด้านบนหน้าจอ
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Post',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="delete"
        options={{
          title: 'Delete',
          tabBarIcon: ({ color }) => <Ionicons name="trash-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}