import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { MyBottomTabNavigationProp, MyBottomTabParamList } from './types';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import FriendScreen from './FriendScreen';
import RecommendScreen from './RecommendScreen';

const Tab = createBottomTabNavigator<MyBottomTabParamList>();

const BottomTab = () => {
  const navigation = useNavigation<MyBottomTabNavigationProp>();

  return (
    <>
      <View style={styles.topTab}>
        <MaterialCommunityIcons
          color={styles.topTabItem.color}
          size={styles.topTabItem.size}
          name="arrow-left"
          onPress={() => navigation.pop(1)}
        />
        <MaterialCommunityIcons
          color={styles.topTabItem.color}
          size={styles.topTabItem.size}
          name="bell"
          onPress={() => navigation.pop(1)}
        />
      </View>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1C1C1C',
          tabBarInactiveTintColor: '#1c1c1c',
          tabBarStyle: {
            backgroundColor: '#E4DDFF',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: '프로필',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Friend"
          component={FriendScreen}
          options={{
            title: '친구',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <MaterialCommunityIcons name="chat" color={color} size={size} />
              ) : (
                <MaterialCommunityIcons
                  name="chat-outline"
                  color={color}
                  size={size}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Recommend"
          component={RecommendScreen}
          options={{
            title: '추천',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account-plus"
                  color={color}
                  size={size}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-plus-outline"
                  color={color}
                  size={size}
                />
              ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    padding: 10,
    backgroundColor: '#FDFDFD',
  },
  topTabItem: {
    color: 'gray',
    size: 30,
  },
});

export default BottomTab;
