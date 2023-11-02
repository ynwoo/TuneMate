import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
} from 'react-native-reanimated';
import LP from './LP';

export default function Player() {
  const bgArray = [
    ['#0272a4', '#f6a564'],
    ['#b6bfc8', '#36595b'],
    ['#e58e82', '#6f569f'],
  ];

  const imageSources = [
    require('@/image/iu_0.jpg'),
    require('@/image/iu_1.jpg'),
    require('@/image/iu_2.jpg'),
    require('@/image/iu_3.jpg'),
    require('@/image/iu_4.jpg'),
    require('@/image/iu_5.jpg'),
  ];

  const totalNum = 6;
  const [pageNum, setPageNum] = useState(0);
  const spinValue = useRef(new Animated.Value(0)).current;

  const handlePrev = () => {
    const newPageNum = (pageNum - 1 + totalNum) % totalNum;
    setPageNum(newPageNum);
    startSpin(); // 스핀 애니메이션 다시 시작
  };

  const handleNext = () => {
    const newPageNum = (pageNum + 1) % totalNum;
    setPageNum(newPageNum);
    startSpin(); // 스핀 애니메이션 다시 시작
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const startSpin = () => {
    spinValue.setValue(0); // 스핀 애니메이션 초기화
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000, // 10 seconds for one full rotation
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        startSpin(); // 애니메이션이 끝나면 다시 시작
      }
    });
  };

  useEffect(() => {
    startSpin();
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
      <View style={styles.contentWrap}>
        <View style={[styles.albumActive, styles.coverImg]}>
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

        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.button} onPress={handlePrev}>
            <Text>PREV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text>NEXT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pointWrap}>{renderPointButtons()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrap: {
    width: '100%',
    height: '100%',
  },
  // album: {
  //   position: 'absolute',
  //   transform: [{ translateX: -150 }, { translateY: 0 }],
  //   width: 800,
  //   height: 800,
  //   opacity: 0,
  //   transition: 'all .4s ease-in-out',
  // },
  albumActive: {
    opacity: 1,
    left: 60,
  },
  coverImg: {
    position: 'absolute',
    width: 800,
    height: 800,
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
    top: 140,
    left: 0,
    width: 300,
    height: 300,
    borderRadius: 196,
    // backgroundColor: 'linear-gradient(120deg, #000, #333333, #000)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 4, height: 14 },
    shadowRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
    transform: [{ translateX: -43 }, { translateY: -43 }],
    width: 90,
    height: 90,
    backgroundColor: '#000000',
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
    top: '48%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 6,
    margin: 3,
    // backgroundColor: '#000',
    color: '#fff',
  },
  buttonHover: {
    backgroundColor: '#fff',
    color: '#000',
  },
  pointWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: 0 }, { translateY: 100 }],
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
