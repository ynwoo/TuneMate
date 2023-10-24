import { StyleSheet, View } from 'react-native';
import FriendItem from './FriendItem';

interface FriendListProps {
  style?: Object;
}

const FriendList = ({ style }: FriendListProps) => {
  return (
    <View style={style}>
      <FriendItem style={styles.friendItem} />
      <FriendItem style={styles.friendItem} />
      <FriendItem style={styles.friendItem} />
      <FriendItem style={styles.friendItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  friendItem: {
    marginBottom: 15,
  },
});

export default FriendList;
