import React, { Component } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

interface RotatingDiskProps {}

interface RotatingDiskState {
  spinValue: Animated.Value;
}

class RotatingDisk extends Component<RotatingDiskProps, RotatingDiskState> {
  constructor(props: RotatingDiskProps) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.state.spinValue.setValue(0);
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 10000, // 10 seconds for one full rotation
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.spin());
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.disk,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disk: {
    width: 200,
    height: 200,
    backgroundColor: 'linear-gradient(120deg, #000, #333333, #000)',
    borderRadius: 100,
  },
});

export default RotatingDisk;
