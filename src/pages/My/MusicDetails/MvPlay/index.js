import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView
} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import util from '../../../../utils/util.js';

class MvPlay extends Component {
    static navigationOptions = ({ navigation }) =>({
        // headerTitle:navigation.state.params.detail.title,
        headerShown:false
    })
    constructor(props){
        super(props);

        this.state={
            isShow:true,
            isPlay:true,
            data:{},
            isLoading:true,
            currentTime: 0.0,                 //当前播放的时间
            paused: 1.0,                      //播放
            sliderValue: 0,                   //进度条的进度
            duration: 0.0,
            comments:[],
            showFoot:0
        };
        this.loadStart = this.loadStart.bind(this);
        this.setDuration = this.setDuration.bind(this);
        this.setTime = this.setTime.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.videoError = this.videoError.bind(this);
        this._getVideoState = this._getVideoState.bind(this);
        this.formatMediaTime = this.formatMediaTime.bind(this);
        this._getData = this._getData.bind(this);
        this._getCommentData = this._getCommentData.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
    }

    loadStart(){
        console.log('视频开始加载');
        this.setState({
            isLoading:true
        })
    }
    //格式化音乐播放的时间为0：00
    formatMediaTime(duration) {
        let min = Math.floor(duration / 60);
        let second = parseInt(duration - min * 60);
        min = min >= 10 ? min : "0" + min;
        second = second >= 10 ? second : "0" + second;
        return min + ":" + second;
    }
    setDuration(duration){
        console.log('视频加载完成，即将播放');
        this.setState({
            isLoading:false,
            duration: duration.duration
        })
    }
    //设置进度条和播放时间的变化
    setTime(data) {
        let sliderValue = Math.ceil(this.state.currentTime);
        this.setState({
            slideValue: sliderValue,
            currentTime: data.currentTime
        });
    }
    onEnd(){
        console.log('视频播放完成');
        this.setState({
            isPlay:0,
            slideValue:0
        })
    }
    videoError(){
        console.log('视频播放出错');
    }
    render() { 
        const { url, duration, currentTime } = this.state.data;
        if( !url ){
            return null
        }
        return (  
            <View>
                <View style={styles.container}>
                    {
                        this.state.isShow && <View style={[styles.head,styles.headWidth]}>
                                                <View style={styles.headerItem}>
                                                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                                        <AntDesign name="left" color={'#fff'} size={22} />
                                                    </TouchableOpacity>
                                                    <Text numberOfLines={1} style={{color:"#fff",marginLeft:10}}>{this.state.data.title}</Text>
                                                </View>
                                                <View style={styles.headerItem}>
                                                    <TouchableOpacity onPress={() => { }}>
                                                        <Feather name="tv" color={'#fff'} size={20} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{marginLeft:10,marginTop:2}} onPress={() => { }}>
                                                        <AntDesign name="videocamera" color={'#fff'} size={20} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                    }
                    <Video
                        source={{uri:url}} // 视频的URL地址，或者本地地址，都可以
                        ref='player'
                        rate={this.state.isPlay ? 1 : 0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                        volume={1.0}                 // 声音的放声音的放大倍数大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                        muted={false}                // true代表静音，默认为false.
                        paused={false}               // true代表暂停，默认为false
                        resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
                        repeat={false}                // 是否重复播放
                        // playInBackground={true}     // 当app转到后台运行的时候，播放是否暂停
                        playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                        onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
                        onLoad={data => this.setDuration(data)}     // 当视频加载完毕时的回调函数
                        onProgress={e => this.setTime(e)}    //  进度控制，每250ms调用一次，以获取视频播放的进度
                        onEnd={this.onEnd}           // 当视频播放完毕后的回调函数
                        onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                        playWhenInactive={true}
                        style={styles.backgroundVideo}
                    />
                    <TouchableOpacity style={styles.modal}>
                        {
                            this.state.isShow && this._getVideoState()
                        }
                    </TouchableOpacity>
                </View>
                <Text style={{fontWeight:"bold",fontSize:16,paddingLeft:10,paddingRight:10}}>精彩评论 </Text>
                <FlatList
                    // style={{height:'94%'}}
                    data={this.state.comments}
                    keyExtractor={this._keyExtractor}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this._onRefresh}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}
                    renderItem={({item,index}) => 
                        
                        <TouchableOpacity style={[styles.layout,{padding:10,borderBottomColor:"#DDD",borderBottomWidth:0.5}]}>
                            <View>
                                <Image source={{uri:item.user.avatarUrl}} style={{width:30, height: 30,borderRadius:15}}  />             
                            </View>
                            <View style={{marginLeft:10,flex:1}}>
                                <View style={styles.layout}>
                                    <View style={[styles.layout,{flex:1}]}>
                                        <Text style={{fontSize:12}}>{item.user.nickname}</Text>
                                        <Text style={{fontSize:12}}>{util.formatTime(item.time)}</Text>
                                    </View>
                                </View>
                                <Text style={{marginTop:10}}>{item.content}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
    _getVideoState(){
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        // 加载完
        return <View style={styles.progress}>
                    <TouchableOpacity onPress={() => { 
                        this.setState({
                            isPlay:!this.state.isPlay,
                        })
                    }}>
                        {
                            this.state.isPlay ? <AntDesign name="pause" color={'#fff'} size={24} /> : <AntDesign name="caretright" color={'#fff'} size={24} />
                        }
                    </TouchableOpacity>
                    <Text style={{color:"#fff",fontSize:14,marginLeft:10}}>{this.formatMediaTime(this.state.currentTime)}</Text>
                    <Slider
                        style={{flex:1,height:36}}   
                        minimumTrackTintColor="#fff"
                        maximumTrackTintColor="#ddd"
                        value={this.state.slideValue}
                        step={1}       
                        maximumValue={this.state.duration}
                        onValueChange={value => {
                            this.setState({ currentTime: value });
                            this.refs.player.seek(value)
                        }}
                    />
                    <Text style={{color:"#fff",fontSize:14,marginRight:10}}>{this.formatMediaTime(this.state.duration)}</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <MaterialCommunityIcons name="arrow-expand-all" color={'#fff'} size={24} />
                    </TouchableOpacity> 
                </View>
    }
    componentDidMount(){
        this._getData()
        this._getCommentData()
    }
    _getData(){
        const id = this.props.navigation.state.params.detail.id;
        const URL = `http://musicapi.leanapp.cn/mv/detail?mvid=${id}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData.data.brs['240'])
            this.setState({
                data:{
                    url:responseData.data.brs['240'],
                    title:responseData.data.name
                },
                isLoading:false
            })
        })
        .catch(function(e) {
        });
    }
    _getCommentData(){
        const id = this.props.navigation.state.params.detail.id;
        const URL = `http://musicapi.leanapp.cn/comment/mv?limit=100&id=${id}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                comments:responseData.comments
            })
        })
        .catch(function(e) {
        });
    }
    
    _keyExtractor = (item, index) => index + ''
    //渲染FlatList 底部显示
    _renderFooter=()=>{
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={{flexDirection:'row',
                    height:24,
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:10}}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={{ flexDirection:'row',
                    height:24,
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:10}}/>

            );
        }
    }
    //上拉加载时触发
    _onEndReached=()=>{
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot !== 0 ){
            return ;
        }
        // //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if( (this.state.start !== 0 ) && (this.state.start >= this.state.totalPage ) ){
            return;
        }
        //底部显示正在加载更多数据
        this.setState({
            showFoot:2
        });
        //获取数据，在componentDidMount()已经请求过数据了
        if (this.state.start > 0){
            this._getData(this.state.key)
        }
    }

}


const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:260,
        backgroundColor:"#000",
        marginBottom:10
    },
    backgroundVideo:{
        position:"absolute",
        left:0,
        top:0,        
        width:'100%',
        height:"100%"
    },
    button:{
        position:'absolute',
        left:0,
        bottom:-200,
        right:0,
        alignItems:'center'
    },
    modal:{
        width:'100%',
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0)"
    },
    progress:{
        height:36,
        position:"absolute",
        paddingRight:10,
        paddingLeft:10,
        bottom:0,
        left:0,
        width:'100%',
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#000"
    },
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    headWidth:{
        width:"100%"
    },
    head:{
        height:50,
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-between",
        position:"absolute",
        top:0,
        left:0,
        backgroundColor:"rgba(0,0,0,0)",
        zIndex:999,
        paddingRight:10,
        paddingLeft:10
    },
    headerItem:{
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-between"
    },
    layout:{
        flexDirection: 'row',
        justifyContent:"space-between"
    }
});

export default MvPlay;