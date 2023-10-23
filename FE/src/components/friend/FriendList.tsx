import FriendItem from "./FriendItem"

interface FriendListProps {
    style?:Object;
}

const FriendList = ({style}:FriendListProps)=> {
    return <FriendItem style={style}/>
}

export default FriendList;