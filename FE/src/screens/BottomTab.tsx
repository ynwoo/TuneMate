import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React from "react"
import { BottomTabParamList, RootStackNavigationProp } from "./types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

const {Navigator,Screen} = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = ()=> {
    const navigation = useNavigation<RootStackNavigationProp>();
    return (
        <>
            <View style={styles.topTab}>
                <MaterialCommunityIcons color={styles.topTabItem.color} size={styles.topTabItem.size} name='arrow-left' onPress={()=>navigation.pop()}/>
                <MaterialCommunityIcons color={styles.topTabItem.color} size={styles.topTabItem.size} name='bell' onPress={()=>navigation.pop()}/>
            </View>
            <Navigator initialRouteName="Home" screenOptions={{
              headerShown: false,
              tabBarActiveTintColor:'#1C1C1C',
              tabBarInactiveTintColor:'#1c1c1c',
              tabBarStyle: {
                backgroundColor:'#E4DDFF'
              },
            }}>
                <Screen name="Home" component={HomeScreen} options={{
                    title:"홈",
                    tabBarIcon:({focused, color, size})=> 
                    focused ? (
                      <MaterialCommunityIcons name="home" color={color} size={size}/>
                    ) : (
                      <MaterialCommunityIcons name="home-outline" color={color} size={size}/>
                    ),
                }}/>
                <Screen name="Profile" component={ProfileScreen} options={{
                    title:"프로필",
                    tabBarIcon:({focused, color,size})=> 
                    focused ? (
                      <MaterialCommunityIcons name="account" color={color} size={size}/>
                    ) : (
                      <MaterialCommunityIcons name="account-outline" color={color} size={size}/>
                    ),
                }}/>
                <Screen name="Friend" component={HomeScreen} options={{
                    title:"친구",
                    tabBarIcon:({focused, color,size})=> 
                    focused ? (
                      <MaterialCommunityIcons name="chat" color={color} size={size}/>
                    ) : (
                      <MaterialCommunityIcons name="chat-outline" color={color} size={size}/>
                    ),
                }}/>
                <Screen name="Recommend" component={HomeScreen} options={{
                    title:"추천",
                    tabBarIcon:({focused, color,size})=> 
                    focused ? (
                      <MaterialCommunityIcons name="account-plus" color={color} size={size}/>
                    ) : (
                      <MaterialCommunityIcons name="account-plus-outline" color={color} size={size}/>
                    ),
                }}/>
            </Navigator>
        </>
    );
}


const styles = StyleSheet.create({
    topTab:{
      flexDirection:"row",
      justifyContent:"space-between",
      height:50,
      padding:10,
      backgroundColor:'#FDFDFD',
    },
    topTabItem:{
      color:"gray",
      size:30,
    },
  })

export default BottomTab;