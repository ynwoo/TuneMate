import { Text, View } from "react-native"

interface FriendItem {
    style?:Object;
}

const FriendItem = ({style}:FriendItem)=> {
    return <View style={style}><Text>친구 한 명</Text></View>
}

export default FriendItem;