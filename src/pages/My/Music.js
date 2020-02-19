import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
	StyleSheet,
	View,
    Text,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import AntDesign from 'react-native-vector-icons/AntDesign';
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;



class Music extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            banners:[],
            text:"",
            playlists:[],
            newPlaylists:[],
            mvData:[],
            artistsData:[],
            firstData:[],
            isLoading:true,
            djprogramData:[]
        }
        this.handleonPress = this.handleonPress.bind(this);
        this._getData = this._getData.bind(this);
        this._getNewData = this._getNewData.bind(this);
        this._getMvData = this._getMvData.bind(this);
        this._getArtistsData = this._getArtistsData.bind(this);
        this.handleChangeSingerMusic = this.handleChangeSingerMusic.bind(this);
        this.henalLink = this.henalLink.bind(this);
        this.handleMmusic = this.handleMmusic.bind(this);
        this._getFirstData = this._getFirstData.bind(this);//排行榜
        this._getdjprogram = this._getdjprogram.bind(this);
    }
    static navigationOptions = {
        title:'音乐'
    }
    render() { 
        const { playlists, artistsData, mvData, firstData, isLoading, djprogramData} = this.state;
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        return (
            <ScrollView>
                <ViewPager style={styles.viewPager} initialPage={0}>
                    {
                        this.state.banners.map((item,index) => {
                            return (
                                <TouchableOpacity  key={index} onPress={() => { this.handleMmusic(item) }}>    
                                    <View>
                                        <Image source={{uri:item.picUrl}} style={{width:ScreenWidth, height: 150}}  />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ViewPager>
                <View style={[styles.recommended,{height:350}]}>
                    <View style={styles.recommendedHeader}>
                        <Text style={{fontSize:16,fontWeight:"bold",lineHeight:40}}>排行榜</Text>
                        <TouchableOpacity onPress={() => { this.henalLink(4)}}  style={{flexDirection: 'row',justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:12,color:"#666"}}>查看更多</Text>
                            <AntDesign name="right" color={'#666'} size={12} />
                        </TouchableOpacity>
                    </View>
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
                </View>
                <View style={styles.recommended}>
                    <View style={styles.recommendedHeader}>
                        <Text style={{fontSize:16,fontWeight:"bold",lineHeight:40}}>热门歌单</Text>
                        <TouchableOpacity onPress={() => { this.henalLink(1)}}  style={{flexDirection: 'row',justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:12,color:"#666"}}>查看更多</Text>
                            <AntDesign name="right" color={'#666'} size={12} />
                        </TouchableOpacity>
                    </View>
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
                </View>
                <View style={[styles.recommended,{height:350}]}>
                    <View style={styles.recommendedHeader}>
                        <Text style={{fontSize:16,fontWeight:"bold",lineHeight:40}}>热门歌手</Text>
                        <TouchableOpacity onPress={() => { this.henalLink(2)}}  style={{flexDirection: 'row',justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:12,color:"#666"}}>查看更多</Text>
                            <AntDesign name="right" color={'#666'} size={12} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        {
                            artistsData.map((item,index) => {
                                return (
                                    <TouchableOpacity style={styles.item} key={index} onPress={() => { this.handleChangeSingerMusic(item) }}>
                                        <View style={{width:'100%', height: 120}}>
                                            <Image source={{uri:item.img1v1Url}} style={{width:'100%', height: 120,borderRadius:4}}  />
                                        </View>
                                        <Text numberOfLines={1}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.recommended}>
                    <View style={styles.recommendedHeader}>
                        <Text style={{fontSize:16,fontWeight:"bold",lineHeight:40}}>MV排行</Text>
                        <TouchableOpacity onPress={() => { this.henalLink(3)}} style={{flexDirection: 'row',justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:12,color:"#666"}}>查看更多</Text>
                            <AntDesign name="right" color={'#666'} size={12} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        {
                            mvData.map((item,index) => {
                                return (
                                    <TouchableOpacity style={styles.item} key={index} onPress={() => { this.handleChangeMv(item) }}>
                                        <View style={{width:'100%', height: 120}}>
                                            <Image source={{uri:item.cover}} style={{width:'100%', height: 120,borderRadius:4}}  />
                                        </View>
                                        <Text numberOfLines={2}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.recommended}>
                    <View style={styles.recommendedHeader}>
                        <Text style={{fontSize:16,fontWeight:"bold",lineHeight:40}}>推荐电台</Text>
                        <TouchableOpacity onPress={() => { this.henalLink(5)}}  style={{flexDirection: 'row',justifyContent:"center",alignItems:"center"}}>
                            <Text style={{fontSize:12,color:"#666"}}>查看更多</Text>
                            <AntDesign name="right" color={'#666'} size={12} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        {
                            djprogramData.map((item,index) => {
                                return (
                                    <TouchableOpacity style={styles.item} key={index} onPress={() => { }}>
                                        <View style={{width:'100%', height: 120}}>
                                            <Image source={{uri:item.picUrl}} style={{width:'100%', height: 120,borderRadius:4}}  />
                                        </View>
                                        <Text numberOfLines={2}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
    _getFirstData(type){
        const URL = `http://musicapi.leanapp.cn/top/list?idx=${type}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                firstData:[...this.state.firstData,{
                    coverImgUrl:responseData.playlist.coverImgUrl,
                    name:responseData.playlist.name,
                    id:responseData.playlist.id
                }],
                isLoading:false
            })
        })
        .catch(function(e) {
            this.setState({
                isLoading:false
            })
        });
    }
    handleMmusic(item){
        this._getMusicUrl(item.targetId)
    }
    _getMusicUrl(id){
        const URL = `http://musicapi.leanapp.cn/music/url?id=${id}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            if( !responseData.data[0].url ){
                return
            }
            this.props.navigation.navigate('MusicPlay', {detail:{
                url:responseData.data[0].url,
                name:"",
                id
            }})
        })
        .catch(function(e) {
            
        });
    }
    henalLink(code){
        if( code === 1) {
            this.props.navigation.navigate('Single',{code});
            return
        }
        if( code === 2) {
            this.props.navigation.navigate('Singer',{code});
            return
        }
        if( code === 3) {
            this.props.navigation.navigate('Mv',{code});
            return
        }
        if( code === 4) {
            this.props.navigation.navigate('First',{code});
            return
        }
    }
    handleChangeSingerMusic(item){
        this.props.navigation.navigate('SingerMusic', {detail: {
            ...item
        }})
    }
    handleChangeMv(item){
        this.props.navigation.navigate('MvPlay', {detail: {
            ...item
        }})
    }
    handleonPress(item){
        this.props.navigation.navigate('MusicDetails', {detail: {
            ...item
        }})
    }
    _getdjprogram(){
        fetch(`http://musicapi.leanapp.cn/dj/hot?limit=7`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                djprogramData:responseData.djRadios
            })
        })
        .catch(function(e) {
            
        });
    }
    componentDidMount(){
        this._getData()//轮播图
        this._getHotData()//热门歌单
        this._getNewData()//热门歌单
        this._getMvData()//mv排行
        this._getdjprogram()//推荐电台
        this._getArtistsData()//入门歌手
        for( let i=0;i<6;i++){
            this._getFirstData(i)//排行榜
        }
    }
    _getArtistsData(){
        fetch(`http://musicapi.leanapp.cn/top/artists?offset=0&limit=6`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                artistsData:responseData.artists
            })
        })
        .catch(function(e) {
            
        });
    }
    _getMvData(){
        fetch(`http://musicapi.leanapp.cn/top/mv?limit=6`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                mvData:responseData.data
            })
        })
        .catch(function(e) {
            
        });
    }
    _getData(){
        fetch(`http://musicapi.leanapp.cn/banner?type=1`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                banners:responseData.banners
            })
        })
        .catch(function(e) {
            
        });
    }
    _getNewData(){
        fetch(`http://musicapi.leanapp.cn/top/playlist?limit=6&order=new`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                newPlaylists:responseData.playlists
            })
        })
        .catch(function(e) {
            
        });
    }
    _getHotData(){
        fetch(`http://musicapi.leanapp.cn/top/playlist?limit=6&order=hot`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                playlists:responseData.playlists
            })
        })
        .catch(function(e) {
            
        });
    }
}

const styles = StyleSheet.create({
    viewPager: {
        width:"100%",
        height:150
    },
    recommended:{
        paddingLeft:10,
        paddingRight:10,
        height:380,
    },
    recommendedHeader:{
        borderTopColor:"#ddd",
        borderTopWidth:0.5,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:"space-between",
        alignItems:"center"
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
    },
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
    },
    horizontal: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        padding: 10
    }
});

export default Music;