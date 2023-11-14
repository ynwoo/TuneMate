import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Props from '@/types';

interface ChatInputBarProps extends Props {
  onPress: () => void;
  onChangeText: (text: string) => void;
  text: string;
}

const ChatInputBar = ({
  style,
  onPress,
  onChangeText,
  text,
}: ChatInputBarProps) => {
  return (
    <View style={[style, styles.chatInputBar]}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={onPress}
        returnKeyType="done"
      />
      <FeatherIcon
        onPress={onPress}
        color={styles.icon.color}
        size={styles.icon.size}
        name="send"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: 'blue',
    size: 30,
  },
  textInput: {
    flex: 1,
  },
  chatInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default ChatInputBar;
