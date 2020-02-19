import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { createDrawerNavigator } from 'react-navigation-drawer';
import EvilIcons from 'react-native-vector-icons/FontAwesome';
import Bookcontent from './Bookcontent.js'
import {
	StyleSheet,
	View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[]
        }
        this._onPress = this._onPress.bind(this);
    }
    render() {
        const { data } = this.state;
        return ( 
            <View style={{width:280}}>
                <FlatList
                    data={data}
                    renderItem={({item,index}) => 
                        <TouchableOpacity onPress={() => this._onPress(item)}>
                            <Text numberOfLines={1} style={styles.item}>{item.title}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
    componentDidMount(){
        const chapters = this.props.navigation.state.params.detail.list;
        this.setState({
            data:[...chapters.map((item,index) =>{
                item.key = index + '';
                return item
            })]
        })
    }
    _onPress(item){
        const title = this.props.navigation.state.params.detail.title;
        this.props.navigation.navigate('Bookcontent', {detail: {
            ...item,
            title
        }})
        this._Drawer()
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
        lineHeight:50,
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        paddingLeft:10
    }
})

// 抽屉
const ContentDrawerNavigator = createDrawerNavigator(
    {
        Bookcontent
    },
    {
        drawerLockMode: 'unlocked',//设置是否响应手势
        useNativeAnimations:true,
        edgeWidth:200,
        minSwipeDistance:20,
        contentComponent:Content
    }
)

export default ContentDrawerNavigator;