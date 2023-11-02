import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ScrollView,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Player from '@/components/player/Player';
import Playlist from '@/components/playlist/Playlist';
import LinearGradient from 'react-native-linear-gradient';

const PlayerScreen = () => {
  return (
    <LinearGradient colors={['#e4ddff', '#ffffff']} style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <ScrollView>
          {/* <Sound /> */}
          <View>
            <Player />

            <View style={styles.playList}>
              <Playlist />
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </LinearGradient>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  playList: {
    bottom: 120,
  },
});
