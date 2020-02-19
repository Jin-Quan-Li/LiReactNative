import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
	StyleSheet,
	View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import util from '../../../utils/util.js';
let ScreenHeight = Dimensions.get('window').height;

class MusicDetails extends Component {
    static navigationOptions = {
        title:'歌单'
    }
    constructor(props) {
        super(props);
        this.state = { 
            list:[],
            privileges:[],
            data:{},
            creator:{},
            isLoading:true
        }
        this._getData = this._getData.bind(this);
        this.handleonPress = this.handleonPress.bind(this);
        this._keyExtractor = this._keyExtractor.bind(this);
        this._getMusicUrl = this._getMusicUrl.bind(this);
    }
    render() { 
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        const { playlists, list, data, creator } = this.state;
        console.log(creator.backgroundUrl)
        console.log(data.coverImgUrl)
        return (
            <>
                <ImageBackground source={{uri:creator.backgroundUrl}} style={{height:236,justifyContent:"center"}}>
                    <View style={styles.header}>
                        <View style={{width:120,height:120}}>
                            <Image source={{uri:data.coverImgUrl}} style={{width:120,height:120,borderRadius:4}}  />            
                        </View>
                        <View style={{flex:1,marginLeft:10,justifyContent:"center"}}>
                            <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>{data.name}</Text> 
                            <View style={{flexDirection: 'row',marginTop:6,marginBottom:6}}>
                                <Image source={{uri:creator.avatarUrl}} style={{width:20,height:20,borderRadius:10}}  />
                                <Text style={{marginLeft:6,color:"#fff"}}>{creator.nickname}</Text>
                            </View>
                            <Text numberOfLines={2} style={{fontSize:12,color:"#fff"}}>{data.description}</Text>           
                        </View>
                    </View>
                    <View style={styles.tool}>
                        <View style={{width:"25%",alignItems:"center"}}>
                            <AntDesign name="sharealt" color={'#fff'} size={19} />
                            <Text style={{fontSize:12,color:"#fff",lineHeight:20}}>{util.formatMoney(data.trackCount)}</Text>
                        </View>
                        <View style={{width:"25%",alignItems:"center"}}>
                            <Feather name="play" color={'#fff'} size={19} />
                            <Text style={{fontSize:12,color:"#fff",lineHeight:20}}>{util.formatMoney(data.playCount)}</Text>
                        </View>
                        <View style={{width:"25%",alignItems:"center"}}>
                            <FontAwesome name="comments" color={'#fff'} size={19} />
                            <Text style={{fontSize:12,color:"#fff",lineHeight:20}}>{util.formatMoney(data.subscribedCount)}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { }} style={{width:"25%",alignItems:"center"}}>
                            <AntDesign name="download" color={'#fff'} size={19} />
                            <Text style={{fontSize:12,color:"#fff",lineHeight:20}}>下载</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <FlatList
                    data={data.tracks}
                    keyExtractor={this._keyExtractor}
                    style={styles.flatlist}
                    renderItem={({item,index}) => 
                        <TouchableOpacity onPress={() => { this.handleonPress(item.id,item.name) }} style={[styles.container,{borderBottomColor:"#ddd",borderBottomWidth:0.5}]} key={index}>
                            <View style={styles.container}>
                                <Text style={[styles.itemHeight,styles.color]}>{index + 1}</Text>
                                <View style={{marginLeft:10,width:300}}>
                                    <Text numberOfLines={1} style={[styles.itemHeight,{fontSize:12,fontWeight:"bold"}]}>{item.name}</Text>
                                </View>
                            </View>
                            <View style={styles.icon}>
                                <AntDesign name="playcircleo" color={'#ddd'} size={20} />
                            </View>
                        </TouchableOpacity>
                    }
                />
            </>
        );
    }
    handleonPress(id,name){
        this._getMusicUrl(id,name)
    }
    _keyExtractor = (item, index) => index + ''
    componentDidMount(){
        const { id } = this.props.navigation.state.params.detail;
        this._getData(id)
    }
    _getMusicUrl(id,name){
        const URL = `http://musicapi.leanapp.cn/music/url?id=${id}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.props.navigation.navigate('MusicPlay', {detail:{
                url:responseData.data[0].url,
                name,
                id
            }})
        })
        .catch(function(e) {
            
        });
    }
    _getData = (id) => {
        fetch(`http://musicapi.leanapp.cn/playlist/detail?id=${id}`)
        .then((response) => response.json())
        .then((responseData) => {
            if( !responseData.playlist.tracks.length ) {
                this.setState({
                    isLoading:false
                })
                return
            }
            this.setState({
                privileges:[...responseData.privileges.map(item => item.id)],
                data:responseData.playlist,
                creator:responseData.playlist.creator,
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
    container: {
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:"space-between",
        height:50
    },
    itemHeight:{
        lineHeight:50
    },
    color:{
        color:"green"
    },
    icon:{
        justifyContent:"center",
        paddingRight:10
    },
    header:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10
    },
    tool:{
        flexDirection: 'row',
        marginTop:20
    },
    flatlist:{
        position:"absolute",
        left:0,
        bottom:0,
        height:480,
        width:"100%",
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#fff",
        overflow:"hidden"
    },
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
    },
    horizontal: {
        flexDirection: 'row',
        padding: 10
    }
});

export default MusicDetails;