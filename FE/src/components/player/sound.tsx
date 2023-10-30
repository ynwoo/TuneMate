import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Sound from 'react-native-sound';

const path = '../../assets/music.mp3';

const music = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('음악 파일 로드 실패:', error);
  } else {
    console.log('음악 파일 로드 성공');
  }
});

const SoundAPI = () => {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          music.play();
        }}
      >
        play
      </Text>

      <Text
        onPress={() => {
          music.pause();
        }}
      >
        pause
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightgrey',
    opacity: 0.3,
    flexDirection: 'row',
  },
});

export default SoundAPI;
