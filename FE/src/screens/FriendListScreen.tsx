import { StyleSheet, View } from 'react-native';
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
        borderWidth:1,
        margin:50,
    },
    friendList: {
        marginLeft:50,
        marginRight:50,
    }
});

export default FriendListScreen;