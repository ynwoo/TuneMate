import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ScrollView,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Player from '@/components/player/Player';
import Playlist from '@/components/playlist/Playlist';
import Sound from '@/components/player/sound';

const PlayerScreen = () => {
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <Sound />
        <View>
          <Player />

          <View style={styles.playList}>
            <Playlist />
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  playList: {
    bottom: 120,
  },
});
