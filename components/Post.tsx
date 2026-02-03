import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';


type PostProps = {
    name: string,
    caption: string,
    profile_image: string,
    Post_image: string
}

export function Post({ name, caption, profile_image, Post_image }: PostProps) {

    const [like, setLike] = useState(1)
    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: "rgb(197, 199, 188)", padding: 20, borderRadius: 15, }}>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 5 , alignItems: 'center'}}>
                <Image source={{ uri: `${profile_image}` }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                <Text style={{ fontSize: 20, fontWeight: 600 }}>{name}</Text>
            </View>
            <View>
                <Text style={{ padding: 6,fontSize:20,fontWeight:500 }}>{caption}</Text>
            </View>

            <Image source={{ uri: `${Post_image}` }} style={{ height: 350, width: 350, borderRadius: 20, marginBottom: 8, marginLeft: 5, marginTop: 7 }} />


            
            <View style={{flexDirection:"row",gap:10}}>
                <Text ><FontAwesome6 name="heart" size="18" color="red" onPress={() => { setLike(like + 1) }} />{like}</Text>
                <Text> <FontAwesome6 name="comment" size="18" /></Text>
                <Text> <FontAwesome6 name="share" size="18" /></Text>
            </View>
            
        </ScrollView>
        </SafeAreaView>
        

    );
}