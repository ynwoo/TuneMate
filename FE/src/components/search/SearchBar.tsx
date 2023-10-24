import React, { Dispatch } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Props from '@/types';

interface SearchBarProps extends Props {
  text: string;
  onChangeText: Dispatch<React.SetStateAction<string>>;
  onPress: () => void;
}

const SearchBar = ({ style, text, onChangeText, onPress }: SearchBarProps) => {
  return (
    <View style={[style, styles.searchBar]}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={onPress}
        returnKeyType="done"
      />
      <Icon
        onPress={onPress}
        color={styles.searchIcon.color}
        size={styles.searchIcon.size}
        name="search"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  searchIcon: {
    color: 'gray',
    size: 30,
  },
});
export default SearchBar;
