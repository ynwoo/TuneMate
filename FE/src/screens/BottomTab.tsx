import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { RootStackNavigationProp, MyBottomTabParamList } from './types';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import RecommendScreen from './RecommendScreen';
import FriendListScreen from './FriendListScreen';
import MyModal from '@/components/modal/MyModal';

const Tab = createBottomTabNavigator<MyBottomTabParamList>();

const BottomTab = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={[styles.bottomTab, modalVisible && styles.blackout]}>
      <MyModal
        message="알림 모달"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.topTab}>
        <MaterialCommunityIcons
          color={styles.topTabItem.color}
          size={styles.topTabItem.size}
          name="arrow-left"
          onPress={() => navigation.pop(1)}
        />
        <Pressable onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons
            color={styles.topTabItem.color}
            size={styles.topTabItem.size}
            name="bell"
            // onPress={() => setModalVisible(true)}
          />
        </Pressable>
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
          name="FriendList"
          component={FriendListScreen}
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
    </View>
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
  bottomTab: {
    flex: 1,
  },
  blackout: {
    opacity: 0.7,
  },
});

export default BottomTab;
