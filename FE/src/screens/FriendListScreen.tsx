import { StyleSheet, Text, View } from 'react-native';
import FriendList from '@/components/friend/FriendList';
import { useState } from 'react';
import SearchBar from '@/components/search/SearchBar';

const FriendListScreen = (): JSX.Element => {
    const [text, setText] = useState<string>("");
    const onSearch = ()=> {
        console.log("search!!!!")
    }
return (
    <View style={styles.block}>
        <SearchBar style={styles.input} text={text} onChangeText={setText} onPress={onSearch}/>
        <FriendList style={styles.friendList}/>
    </View>
);
};

const styles = StyleSheet.create({
    block:{
        flex:1,
    },
    input:{
        height:40,
        borderColor:"gray",
        borderWidth:2,
        margin:50,
    },
    friendList: {
        margin:50,
    }
});

export default FriendListScreen;