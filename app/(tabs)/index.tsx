import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// --- สร้าง Component ปุ่มกดแบบมีลูกเล่น ---
const ActionButtons = () => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  return (
    <View style={styles.iconRow}>
      <TouchableOpacity onPress={() => setLiked(!liked)}>
        <Ionicons 
          name={liked ? "heart" : "heart-outline"} 
          size={22} 
          color={liked ? "#ed4956" : "#fff"} 
          style={styles.icon} 
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="chatbubble-outline" size={20} color="#fff" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setReposted(!reposted)}>
        <Ionicons 
          name="repeat-outline" 
          size={22} 
          color={reposted ? "#00D26A" : "#fff"} 
          style={styles.icon} 
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="paper-plane-outline" size={21} color="#fff" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<any[]>([]);

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

  const renderHeader = () => (
    <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
      {/* ส่วนบน: Profile Section */}
      <View style={styles.profileHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerName}>sunrise</Text>
          <View style={styles.subHeader}>
            <Text style={styles.usernameText}>rin 🍒</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>threads.net</Text>
            </View>
          </View>
        </View>
        <Image 
          source={{ uri: "https://i.pinimg.com/736x/78/c5/59/78c559b436a37a0d2453c93df978c054.jpg" }} 
          style={styles.mainAvatar} 
        />
      </View>

      <Text style={styles.bioText}>知らぬが仏。</Text>
      <Text style={styles.tagText}>1:25 | 🐰 🎧 </Text>
      
      <Text style={styles.followerText}>100K followers</Text>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.darkButton}>
          <Text style={styles.buttonText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.darkButton}>
          <Text style={styles.buttonText}>Share profile</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.activeTab}><Text style={styles.activeTabText}>Threads</Text></View>
        <View style={styles.inactiveTab}><Text style={styles.inactiveTabText}>Replies</Text></View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.threadCard}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: "https://i.pinimg.com/736x/10/5b/17/105b17a321eff97eeff9eb837c6d7779.jpg" }} style={styles.smallAvatar} />
                <View style={styles.threadLine} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.postAuthor}>Charin.yy</Text>
                  <Ionicons name="ellipsis-horizontal" size={16} color="#666" />
                </View>
                <Text style={styles.postContent}>{item.text}</Text>
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
                )}
                <ActionButtons />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  profileHeader: { flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' },
  headerName: { fontWeight: '900', fontSize: 28, color: '#fff' },
  subHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  usernameText: { fontSize: 15, color: '#fff' },
  badge: { backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2, marginLeft: 8 },
  badgeText: { fontSize: 12, color: '#666' },
  mainAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 0.5, borderColor: '#333' },
  bioText: { marginTop: 15, fontSize: 16, color: '#fff', fontWeight: '400' },
  tagText: { marginTop: 8, color: "#fff", opacity: 0.8 },
  followerText: { marginTop: 15, color: '#666', fontSize: 14 },
  buttonRow: { flexDirection: 'row', marginTop: 20 },
  darkButton: { flex: 1, backgroundColor: '#000', borderWidth: 0.8, borderColor: '#333', borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginHorizontal: 4 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  tabContainer: { flexDirection: 'row', marginTop: 25, borderBottomWidth: 0.2, borderBottomColor: '#333' },
  activeTab: { flex: 1, alignItems: 'center', paddingBottom: 12, borderBottomWidth: 1.5, borderBottomColor: '#fff' },
  activeTabText: { color: '#fff', fontWeight: '700' },
  inactiveTab: { flex: 1, alignItems: 'center', paddingBottom: 12 },
  inactiveTabText: { color: '#666', fontWeight: '700' },
  threadCard: { padding: 16, borderBottomWidth: 0.2, borderBottomColor: '#333' },
  smallAvatar: { width: 38, height: 38, borderRadius: 19 },
  threadLine: { width: 1.5, flex: 1, backgroundColor: '#1A1A1A', marginVertical: 6 },
  postAuthor: { fontWeight: '700', color: '#fff', fontSize: 15 },
  postContent: { fontSize: 15, marginTop: 4, color: '#efefef', lineHeight: 20 },
  postImage: { width: '100%', height: 300, borderRadius: 14, marginTop: 12, borderWidth: 0.5, borderColor: '#222' },
  iconRow: { flexDirection: 'row', marginTop: 15, alignItems: 'center' },
  icon: { marginRight: 22 }
});