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

class Singer extends Component {
    static navigationOptions = {
        title:'热门歌手'
    }
    constructor(props) {
        super(props);
        this.state = { 
            artistsData:[],
            data:[
                {
                    list:[],
                    key:'1'
                }
            ],
            isLoading:true
        }
        this._getArtistsData == this._getArtistsData.bind(this);
        this.handleChangeSingerMusic = this.handleChangeSingerMusic.bind(this);
    }
    render() { 
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        const artistsData = this.state.artistsData;
        return ( 
            <View>
                <FlatList
                    style={{padding:10}}
                    data={this.state.data}
                    renderItem={({itemName,i}) => 
                        <View style={styles.container}>
                            {
                                artistsData.map((item,index) => {
                                    return (
                                        <TouchableOpacity style={styles.item} key={index} onPress={() => { this.handleChangeSingerMusic(item) }}>
                                            <View style={{width:'100%', height: 120}}>
                                                <Image source={{uri:item.img1v1Url}} style={{width:'100%', height: 120,borderRadius:4}}  />
                                            </View>
                                            <Text numberOfLines={1} style={{textAlign:"center"}}>{item.name}</Text>
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
    handleChangeSingerMusic(item){
        this.props.navigation.navigate('SingerMusic', {detail: {
            ...item
        }})
    }
    componentDidMount(){
        this._getArtistsData()//热门歌单
    }
    _getArtistsData(){
        fetch(`http://musicapi.leanapp.cn/top/artists?offset=&limit=30`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                artistsData:responseData.artists,
                isLoading:false
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

export default Singer;
