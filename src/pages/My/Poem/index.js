import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
	View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import PoemSong from './PoemSong.js';
import PoemTang from './PoemTang.js';


const PoemTopTabNavigator = createMaterialTopTabNavigator(
    {
        PoemTang:{
            screen:PoemTang,
            onNavigationStateChange:() =>{
                console.log(111111)
            }
        },
        PoemSong
    },
    {
        tabBarPosition: 'top',       //标签栏在屏幕顶部还是底部
        swipeEnabled:true,           //是否可以滑动切换标签
        backBehavior:'none',         //andorid按下返回键将返回initalRouteName，如果设置非initalRouteName则直接结束标签导航
        lazy: false,                    //是否只渲染显示的标签
        animationEnabled: true,         //标签切换是否有动画效果
        tabBarOptions: {
            activeTintColor: 'red',  //标签栏激活字体颜色
            inactiveTintColor: '#666',//标签栏未激活字体颜色
            showLabel: true,             //是否显示标签栏
            labelStyle: {
                fontSize: 16,
                fontWeight:'bold',
                margin:0,
                padding:0
            },  //标签样式(可设置字体大小等)
            scrollEnabled: true,        //是否可以滚动标签栏目(当tab总数超过一屏)
            style: {
                backgroundColor: '#fff'
            }, //设置整个tabbar样式(背景颜色等)
            indicatorStyle:{
                backgroundColor:"red"
            },
            tabStyle:{
                width:Dimensions.get('window').width / 2
            },
            allowFontScaling:true
        }
    }
)

export default PoemTopTabNavigator;
