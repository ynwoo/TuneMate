import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Swipeable,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

type PlayProps = {
  data: {
    title: string;
    artist: string;
    cover: string;
  };
  index: number;
  listData: any[];
  setListData: React.Dispatch<React.SetStateAction<any[]>>;
};

const PlaylistItem = ({ data, index, listData, setListData }: PlayProps) => {
  const swipeableRef = useRef<Swipeable>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  const handlePlaying = () => {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  const removeFromList = () => {
    const removingData = [...listData];
    console.log(index)
    removingData.splice(index, 1);
    for (let i = 0; i < removingData.length; i++) {
      console.log(removingData[i].key);
      removingData[i]["key"] = i + 1;
      console.log(removingData[i].key);
    }
    console.log(removingData);
    setListData(removingData);
  };

  const rightSwipe = (
    dragX: Animated.AnimatedInterpolation<string | number>,
    index: number,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity activeOpacity={0.6} onPress={removeFromList}>
        <View style={styles.deleteBox}>
          <Animated.Text
            style={[
              styles.deleteText,
              {
                transform: [{ translateX: scale }],
              },
            ]}
          >
            삭제
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={styles.background}>
      <Swipeable renderRightActions={(dragX) => rightSwipe(dragX, index)}>
        <TouchableOpacity onPress={handlePlaying}>
          <View style={playing ? styles.blockPoint : styles.block}>
            <View style={styles.itemLeft}>
              <Image
                style={styles.albumImg}
                source={{
                  uri: data.cover,
                }}
              />
              <View style={styles.songInfo}>
                <Text style={playing ? styles.songTextPoint : styles.songText}>
                  {data.title}
                </Text>
                <Text
                  style={playing ? styles.artistTextPoint : styles.artistText}
                >
                  {data.artist}
                </Text>
              </View>
            </View>
            <Icon
              color={playing ? '#fdfdfd' : '#666666'}
              size={30}
              name="play-circle-outline"
            />
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  blockPoint: {
    backgroundColor: '#463296',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 320,
  },
  block: {
    backgroundColor: '#fdfdfd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 320,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumImg: {
    width: 40,
    height: 40,
  },
  songInfo: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  songText: {
    fontSize: 20,
    color: '#666666',
  },
  artistText: {
    fontSize: 15,
    color: '#666666',
  },
  songTextPoint: {
    fontSize: 20,
    color: '#fdfdfd',
  },
  artistTextPoint: {
    fontSize: 15,
    color: '#fdfdfd',
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    paddingLeft: 31,
    height: 60,
  },
  deleteText: {
    color: '#fdfdfd',
    fontSize: 15,
  },
  background: {
    backgroundColor: '#cccccc',
  },
});

export default PlaylistItem;
