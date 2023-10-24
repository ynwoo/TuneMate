import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaylistMenu = () => {
  return (
    <View>
      <Text>PlaylistMenu</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  menuBlockTop: {
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  menuBlockMid: {
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c',
  },
  menuBlockBot: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaylistMenu;