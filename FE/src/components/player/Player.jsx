import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

export default function Player() {
  const bgArray = [
    ['#0272a4', '#f6a564'],
    ['#b6bfc8', '#36595b'],
    ['#e58e82', '#6f569f'],
  ];

  const totalNum = 3;
  const [pageNum, setPageNum] = useState(0);

  const handlePrev = () => {
    const newPageNum = (pageNum - 1 + totalNum) % totalNum;
    setPageNum(newPageNum);
  };

  const handleNext = () => {
    const newPageNum = (pageNum + 1) % totalNum;
    setPageNum(newPageNum);
  };

  const imageSources = [
    require('@/image/iu_0.jpg'),
    require('@/image/iu_1.jpg'),
    require('@/image/iu_2.jpg'),
  ];

  const renderPointButtons = () => {
    const pointButtons = [];

    for (let idx = 0; idx < totalNum; idx++) {
      pointButtons.push(
        <TouchableOpacity
          key={idx}
          style={[styles.point, pageNum === idx && styles.activePoint]}
          onPress={() => setPageNum(idx)}
        />,
      );
    }

    return pointButtons;
  };

  const diskRotationValue = new Animated.Value(0);

  const startDiskRotation = () => {
    Animated.loop(
      Animated.timing(diskRotationValue, {
        toValue: 1,
        duration: 10000, // 10 seconds for one full rotation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  startDiskRotation();

  const interpolatedDiskRotation = diskRotationValue.interpolate({
    inputRange: [0, 0],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.contentWrap}>
      <View style={[styles.album, styles.albumActive, styles.coverImg]}>
        <View style={styles.diskContainer}>
          <Animated.View
            style={[
              styles.disk,
              { transform: [{ rotate: interpolatedDiskRotation }] },
            ]}
          >
            <View style={styles.diskInner}></View>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.coverImg}>
          <Image
            style={{ width: 300, height: 300 }}
            source={imageSources[pageNum]}
          />
        </TouchableOpacity>
        <Text>{pageNum}</Text>
      </View>
      <View style={styles.pointWrap}>{renderPointButtons()}</View>
      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.button} onPress={handlePrev}>
          <Text>PREV</Text>
          <Text>{pageNum}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrap: {
    width: '100%',
    height: '100%',
  },
  album: {
    position: 'absolute',
    transform: [{ translateX: -150 }, { translateY: 150 }],
    width: 200,
    height: 200,
    opacity: 0,
    transition: 'all .4s ease-in-out',
  },
  albumActive: {
    opacity: 1,
    left: '50%',
  },
  coverImg: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 2, height: 14 },
    shadowRadius: 40,
  },
  diskContainer: {
    position: 'absolute',
    top: 4,
    left: 0,
    width: 392,
    height: 392,
  },
  disk: {
    position: 'absolute',
    top: 4,
    left: 0,
    width: 392,
    height: 392,
    borderRadius: 196,
    backgroundColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 4, height: 14 },
    shadowRadius: 40,
  },
  diskMobile: {
    width: 244,
    height: 244,
    borderRadius: 122,
  },
  diskInner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: 50 }, { translateY: 50 }],
    width: 160,
    height: 160,
    backgroundColor: '#0473a4',
    borderRadius: 80,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  diskInnerMobile: {
    width: 100,
    height: 100,
  },
  diskInnerDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: 50 }, { translateY: 50 }],
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'black',
  },
  buttonWrap: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 6,
    margin: 3,
    backgroundColor: '#000',
    color: '#fff',
  },
  buttonHover: {
    backgroundColor: '#fff',
    color: '#000',
  },
  pointWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  point: {
    width: 10,
    height: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  pointActive: {
    backgroundColor: 'black',
  },
});