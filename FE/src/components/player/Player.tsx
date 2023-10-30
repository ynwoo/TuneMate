import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import Play from './Play';

export default function Player() {
  const totalNum = 6;
  const [pageNum, setPageNum] = useState(0);
  const spinValue = new Animated.Value(0);

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
    require('@/image/iu_3.jpg'),
    require('@/image/iu_4.jpg'),
    require('@/image/iu_5.jpg'),
  ];

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000, // 10 seconds for one full rotation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const renderPointButtons = () => {
    const pointButtons = [];

    for (let idx = 0; idx < totalNum; idx++) {
      pointButtons.push(
        <TouchableOpacity
          key={idx}
          style={[styles.point, pageNum === idx && styles.pointActive]}
          onPress={() => setPageNum(idx)}
        />,
      );
    }

    return pointButtons;
  };

  return (
    <View>
      <View>
        <Play />
      </View>
      <View style={styles.contentWrap}>
        <View style={styles.bg}>
          <View style={[styles.album, styles.albumActive, styles.coverImg]}>
            <View style={styles.diskContainer}>
              <Animated.View
                style={[styles.disk, { transform: [{ rotate: spin }] }]}
              >
                <ImageBackground
                  source={imageSources[pageNum]}
                  style={{ width: '100%', height: '100%' }}
                >
                  <View style={styles.diskInner} />
                </ImageBackground>
              </Animated.View>
            </View>
          </View>
        </View>
        <View style={styles.pointWrap}>{renderPointButtons()}</View>
        <Text>Play</Text>
      </View>
      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.button} onPress={handlePrev}>
          <Text>PREV</Text>
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
    height: '60%',
  },
  album: {
    position: 'absolute',
    transform: [{ translateX: -150 }, { translateY: 0 }],
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
    top: 40,
    left: 0,
    width: 300,
    height: 300,
    borderRadius: 196,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 4, height: 14 },
    shadowRadius: 40,
    overflow: 'hidden',
  },
  diskInner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -45 }, { translateY: -45 }],
    width: 90,
    height: 90,
    backgroundColor: '#000000',
    borderRadius: 80,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  buttonWrap: {
    position: 'absolute',
    bottom: '20%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 6,
    margin: 3,
  },
  pointWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    transform: [{ translateX: 145 }, { translateY: 0 }],
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
  bg: {
    backgroundColor: 'grey',
    top: '10%',
    width: '100%',
    height: 400,
  },
});
