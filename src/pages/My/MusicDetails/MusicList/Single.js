import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

class Single extends Component {
    static navigationOptions = {
        title:'热门歌单'
    }
    constructor(props) {
        super(props);
        this.state = { 
            playlists:[],
            refreshing:true,
            data:[
                {
                    list:[],
                    key:'1'
                }
            ],
            isLoading:true
        }
        this._getHotData == this._getHotData.bind(this);
        this.handleonPress = this.handleonPress.bind(this);
    }
    render() { 
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        const playlists = this.state.playlists;
        return ( 
            <View>
                <FlatList
                    data={this.state.data}
                    style={{padding:10}}
                    renderItem={({itemName,i}) => 
                        <View style={styles.container}>
                            {
                                playlists.map((item,index) => {
                                    return (
                                        <TouchableOpacity style={styles.item} key={index} onPress={() => { this.handleonPress(item) }}>
                                            <View style={{width:'100%', height: 120}}>
                                                <Image source={{uri:item.coverImgUrl}} style={{width:'100%', height: 120,borderRadius:4}}  />
                                            </View>
                                            <Text numberOfLines={2}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    }
                />
            </View>
        );
    }
    handleonPress(item){
        this.props.navigation.navigate('MusicDetails', {detail: {
            ...item
        }})
    }
    componentDidMount(){
        this._getHotData()//热门歌单
    }
    _getHotData(){
        fetch(`http://musicapi.leanapp.cn/top/playlist?limit=30&order=hot`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                playlists:responseData.playlists,
                isLoading:false
            })
        })
        .catch(function(e) {
            this.setState({
                isLoading:false
            })
        });
    }
}

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
    },
    horizontal: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        padding: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:"space-between"
    },
    item:{
        width:'32%',
        marginBottom:14
    }
});

export default Single;
