import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackNavigationProp } from '@/screens/types';
import Props from '@/types';

interface ChatMainProps extends Props {
  onOpenDrawer: () => void;
}

const ChatMain = ({ onOpenDrawer }: ChatMainProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View>
      <View style={styles.topTab}>
        <MaterialCommunityIcons
          color={styles.topTabItem.color}
          size={styles.topTabItem.size}
          name="arrow-left"
          onPress={() => navigation.pop(1)}
        />
        <MaterialCommunityIcons
          color={styles.topTabItem.color}
          size={styles.topTabItem.size}
          name="menu"
          onPress={onOpenDrawer}
        />
      </View>
      <View style={styles.chat}>
        <Text>chat</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    padding: 10,
    backgroundColor: '#FDFDFD',
  },
  topTabItem: {
    color: 'gray',
    size: 30,
  },
  chat: {
    flex: 1,
  },
});

export default ChatMain;
