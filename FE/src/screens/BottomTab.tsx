import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React from "react"
import { BottomTabParamList, RootStackNavigationProp } from "./types";
import Icon from "react-native-vector-icons/MaterialIcons"
import HomeScreen from "./HomeScreen";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

const {Navigator,Screen} = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = ()=> {
    const navigation = useNavigation<RootStackNavigationProp>();
    return (
        <>
            <View style={styles.topTab}>
                <Icon color={styles.topTabItem.color} size={styles.topTabItem.size} name='arrow-back' onPress={()=>navigation.pop()}/>
                <Icon color={styles.topTabItem.color} size={styles.topTabItem.size} name='add-alert' onPress={()=>navigation.pop()}/>
            </View>
            <Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
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
        </>
    );
}


const styles = StyleSheet.create({
    topTab:{
      flexDirection:"row",
      justifyContent:"space-between",
      height:50,
      padding:10,
    },
    topTabItem:{
      color:"gray",
      size:30,
    }
  })

export default BottomTab;