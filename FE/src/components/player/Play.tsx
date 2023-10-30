import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SpotifyPlayer from 'react-spotify-web-playback';

function App() {
  const token =
    'BQAV7G8DFwHMfvs_HzLf7XRA1n-bxBGty-3Yu41mRTz0kMAi-6ZKrhTNYf0Ku3eldJGu_1S_PX76or2U5VzbD-tByP8CSFsqLrcnSjPHQjk9P1qUdh0zj6PjyhCQ4GPYkXGtKeV0msKTU4B_XeVUIf6afaadkwUSLkiHn0c83S2w7MIrT5YZ2TzK9IEgdVnyqaZV80_S4p7fx15ErL5V33kjUV9AQAeW'; // Spotify API에서 얻은 액세스 토큰

  return (
    <View style={{ flex: 1 }}>
      <SpotifyPlayer
        token={token}
        uris={['spotify:track:7sxUb59tfiuzagetBF47AN']} // 재생하고 싶은 트랙의 URI
      />
    </View>
  );
}

export default App;
