import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { createDrawerNavigator } from 'react-navigation-drawer';
import EvilIcons from 'react-native-vector-icons/FontAwesome';
import Music from './Music.js';
import OpenApp from './OpenApp.js';
import VideoTopTabNavigator from './VideoPlayer/index.js';
import portrait from '../../images/portrait.jpeg'
import News from "./News/index.js";
import Poem from "./Poem/index.js";

import {
	StyleSheet,
	View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';


class My extends Component {
    render() { 
        return ( 
            <View>
                <View style={{width:280}}>
                    <TouchableOpacity
                        style={styles.imageWrapper}>
                        <Image style={styles.image} source={portrait} />
                        <Text style={{color:'#fff',lineHeight:40}}>一棵小草</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this._onPress('VideoTopTabNavigator')}>
                    <Text style={styles.item}>视频</Text>
                    <EvilIcons style={styles.icon} name="chevron-right" size={10} color="#ddd" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this._onPress('Music')}>
                    <Text style={styles.item}>音乐</Text>
                    <EvilIcons style={styles.icon} name="chevron-right" size={10} color="#ddd" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this._onPress('News')}>
                    <Text style={styles.item}>网易新闻</Text>
                    <EvilIcons style={styles.icon} name="chevron-right" size={10} color="#ddd" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this._onPress('Poem')}>
                    <Text style={styles.item}>沙雕</Text>
                    <EvilIcons style={styles.icon} name="chevron-right" size={10} color="#ddd" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this._onPress('OpenApp')}>
                    <Text style={styles.item}>唤醒APP</Text>
                    <EvilIcons style={styles.icon} name="chevron-right" size={10} color="#ddd" />
                </TouchableOpacity>
            </View>
        );
    }
    _onPress(name){
        this._Drawer()
        this.props.navigation.navigate(name)
    }
    _Drawer(){
        this.props.navigation.toggleDrawer()
    }
}

const styles = StyleSheet.create({
    container: {
        position:'relative',
        width:280,
        textAlign:'center',
        height:50,
        lineHeight:50,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2"
    },
    item:{
        flex:1,
        textAlign:'center',
        height:50,
        lineHeight:50
    },
    icon:{
        position:'absolute',
        top:'43%',
        right:10
    },
    image:{
        width:70,
        height:70,
        overflow:'hidden',
        borderRadius:35
    },
    imageWrapper:{
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
        width: '100%',
        backgroundColor:"#666",
        height:200,
    }
})

// 抽屉
const MyDrawerNavigator = createDrawerNavigator(
    {
        Music:{
            screen:Music
        },
        OpenApp,
        VideoTopTabNavigator,
        News,
        Poem
    },
    {
        drawerLockMode: 'unlocked',//设置是否响应手势
        useNativeAnimations:true,
        edgeWidth:200,
        minSwipeDistance:20,
        contentComponent:My
    }
)

export default MyDrawerNavigator;