import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import FriendList from '@/components/friend/FriendList';
import SearchBar from '@/components/search/SearchBar';
import useSocialFriendsQuery from '@/hooks/queries/social/useSocialFriendsQuery';
import { Friend } from '@/types/social';
import useUserInfoQuery from '@/hooks/queries/user/useUserInfoQuery';

const initData = [
  { freindId: '0', name: 'ss1' },
  { freindId: '1', name: 'ss2' },
  { freindId: '2', name: 'ss3' },
  { freindId: '3', name: 'ss4' },
  { freindId: '4', name: 'ss5' },
  { freindId: '5', name: 'ss6' },
] as Friend[];

const FriendListScreen = (): JSX.Element => {
  const [text, setText] = useState<string>('');
  const { data: friends } = useSocialFriendsQuery();
  const { data: userInfo } = useUserInfoQuery(
    'cb899bc8-33a9-43a6-938c-76b0ec286c77',
  );
  console.log('friends', friends);
  console.log('userInfo', userInfo);

  const onSearch = () => {
    console.log('search!!!!');
  };
  return (
    <View style={styles.block}>
      <SearchBar
        style={styles.input}
        text={text}
        onChangeText={setText}
        onPress={onSearch}
      />
      <FriendList friends={friends ?? initData} style={styles.friendList} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 50,
  },
  friendList: {
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default FriendListScreen;
