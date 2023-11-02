import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RootStackNavigationProp } from './types';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import useUserInfoQuery from '@/hooks/queries/user/useUserInfoQuery';

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [recentlyLoaded, setRecentlyLoaded] = useState([]);
  const { data: userInfo } = useUserInfoQuery(
    'ab1b4b7f-abb2-4bf1-920f-b437233b4f47',
  );
  const playListId = '63xD8kIV3AHaAVtEHlbD3W';
  // console.log('userInfo', userInfo);

  const getRecentlyPlayedSongs = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://api.spotify.com/v1/playlists/${playListId}`,
        headers: {
          Authorization: `Bearer ${userInfo?.spotifyAccessToken}`,
        },
      });
      console.log('log', response.data.tracks.items[0]);
      const trackIds = response.data.tracks.items.map((item) => item.track.id);
      console.log(trackIds);

      const tracks = response.data.items;
      setRecentlyLoaded(tracks);
    } catch (err) {
      console.log('err : ', err);
    }
  };
  console.log('song', recentlyLoaded);

  useEffect(() => {
    if (userInfo?.spotifyAccessToken) {
      getRecentlyPlayedSongs();
    }
  }, [userInfo]);

  return (
    <LinearGradient colors={['#e4ddff', '#ffffff']} style={{ flex: 1 }}>
      <View style={block}>
        <Text>home</Text>
        <Button title="player" onPress={() => navigation.navigate('Player')} />
      </View>
    </LinearGradient>
  );
};

const { block } = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  block: {
    flex: 1,
    backgroundColor: '#ececec',
  },
});

export default HomeScreen;
