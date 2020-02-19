import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MyDrawerNavigator from './My';
import Bookcase from './Bookcase';
import Ranking from './Ranking';
import Search from './Search';
import Varieties from './Varieties';
import Welcome from './Welcome';
import Details from './Varieties/Details';
import Introduce from './Varieties/Introduce';
import RankingTop from './Ranking/RankingTop';
import ContentDrawerNavigator from './Varieties/Content';
import VideoDetail from './My/VideoPlayer/VideoDetail/index.js';
import Trivia from './My/VideoPlayer/Trivia/index.js';
import VideoPlay from './My/VideoPlayer/VideoPlay/index.js';
import MusicDetails from './My/MusicDetails/index.js';
import MusicPlay from './My/MusicDetails/MusicPlay/index.js';
import MvPlay from './My/MusicDetails/MvPlay/index.js';
import SingerMusic from './My/MusicDetails/SingerMusic/index.js';
import MusicList from './My/MusicDetails/MusicList/index.js';
import NewsDetails from './My/News/NewsDetails.js';

import {
	StyleSheet,
	View,
	Text
} from 'react-native';


// 底部菜单栏
const TabNavigator = createBottomTabNavigator(
    {
        Bookcase:Bookcase,
        Varieties: {
            screen:Varieties,
            navigationOptions:{
                title:'分类',
                tabBarIcon:({tintColor}) => {
                    return <AntDesign name="appstore-o" color={tintColor} size={24} />
                }
            }
        },
        Ranking: Ranking,
        Search: Search,
        My:{
            screen:createAppContainer(MyDrawerNavigator),
            navigationOptions:{
                title:'我的',
                tabBarIcon:({tintColor}) => {
                    return <Feather name="user" color={tintColor} size={24} />
                },
                tabBarOnPress: (event) => {
                    // event.navigation.toggleDrawer()
                    event.navigation.openDrawer()
                }
            }
        }
    },
    {
        initialRouteName:'Varieties'
    }
);


// 全局路由
const Stack = createStackNavigator(
    {
        TabNavigator:{
            screen:TabNavigator,
            navigationOptions: ({ navigation }) => ({
                headerShown:false
            }),
        },
        Details,
        Introduce,
        RankingTop:{
            screen:RankingTop,
            navigationOptions: ({ navigation }) =>({
                headerTitle:navigation.state.params.detail.shortTitle,
                gestureEnabled:true,
                gesturesEnabled:true,
                headerTintColor:"#fff",
                headerStyle:{
                    backgroundColor:"blue"
                }
            })
        },
        ContentDrawerNavigator:{
            screen:ContentDrawerNavigator,
            navigationOptions:({ navigation }) =>({
                title:navigation.state.params.detail.title,
                gestureEnabled:true
            })
        },
        VideoDetail,
        Trivia,
        VideoPlay,
        MusicDetails,
        MusicPlay,
        MvPlay,
        SingerMusic,
        MusicList:{
            screen:MusicList,
            navigationOptions:({ navigation }) =>({
                headerShown:false
            })
        },
        NewsDetails
    },{
        mode:'card'
    }
)

// 欢迎页
const WelcomeStackNavigator = createStackNavigator({
	Welcome: {
		screen: Welcome,
		navigationOptions: {
            headerShown:false
		}
	}
});

// 总挂载点
const SwitchNavigator = createSwitchNavigator({
    welcome:WelcomeStackNavigator,
    Main:Stack
}) 

export default createAppContainer(SwitchNavigator);;