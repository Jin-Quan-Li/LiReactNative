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

class First extends Component {
    static navigationOptions = {
        title:'排行榜'
    }
    constructor(props) {
        super(props);
        this.state = { 
            firstData:[],
            data:[
                {
                    list:[],
                    key:'1'
                }
            ],
            isLoading:true
        }
        this.handleonPress = this.handleonPress.bind(this);
        this._getFirstData= this._getFirstData.bind(this);
    }
    render() { 
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        const firstData = this.state.firstData;
        return ( 
            <View>
                <FlatList
                    style={{padding:10}}
                    data={this.state.data}
                    renderItem={({itemName,i}) => 
                    <View style={styles.container}>
                        {
                            firstData.map((item,index) => {
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
        for( let i=0;i<30;i++){
            this._getFirstData(i)//排行榜
        }
    }
    _getFirstData(type){
        const URL = `http://musicapi.leanapp.cn/top/list?idx=${type}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                isLoading:false,
                firstData:[...this.state.firstData,{
                    coverImgUrl:responseData.playlist.coverImgUrl,
                    name:responseData.playlist.name,
                    id:responseData.playlist.id
                }]
            })
        })
        .catch(function(e) {
            
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

export default First;
