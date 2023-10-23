import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React from "react"
import { BottomTabParamList } from "./types";
import Icon from "react-native-vector-icons/MaterialIcons"
import HomeScreen from "./HomeScreen";

const {Navigator,Screen} = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = ()=> {
    return (
    <Navigator initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} options={{
            title:"홈",
            tabBarIcon:({color,size})=> <Icon name="home" color={color} size={size}/>
        }}/>
        <Screen name="Profile" component={HomeScreen} options={{
            title:"프로필",
            tabBarIcon:({color,size})=> <Icon name="person" color={color} size={size}/>
        }}/>
        <Screen name="Friend" component={HomeScreen} options={{
            title:"친구",
            tabBarIcon:({color,size})=> <Icon name="chat" color={color} size={size}/>
        }}/>
        <Screen name="Recommend" component={HomeScreen} options={{
            title:"추천",
            tabBarIcon:({color,size})=> <Icon name="recommend" color={color} size={size}/>
        }}/>
    </Navigator>
    );
}

export default BottomTab;