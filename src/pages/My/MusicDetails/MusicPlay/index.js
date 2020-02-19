import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    Image,
    Animated
} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;
import tape from '../../../../images/胶片盘.png'

class MusicPlay extends Component {
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
            al:{},
            songs:{}
            
        };
        this.loadStart = this.loadStart.bind(this);
        this.setDuration = this.setDuration.bind(this);
        this.setTime = this.setTime.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.videoError = this.videoError.bind(this);
        this._getVideoState = this._getVideoState.bind(this);
        this.formatMediaTime = this.formatMediaTime.bind(this);
        this._getMusicDetail = this._getMusicDetail.bind(this);
        this._getLyric = this._getLyric.bind(this);
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
            <View style={{backgroundColor:"#666", height:ScreenHeight,width:ScreenWidth,alignItems:"center",justifyContent:"center"}}>
                <View style={styles.headTitle}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <AntDesign name="left" color={'#fff'} size={22} />
                    </TouchableOpacity>
                    <Text style={{color:"#fff"}}>{this.state.songs.name}</Text>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <FontAwesome name="share-square-o" color={'#fff'} size={22} />
                    </TouchableOpacity>
                </View>
                <Video
                    source={{uri:url}} // 视频的URL地址，或者本地地址，都可以
                    ref='player'
                    rate={this.state.isPlay ? 1 : 0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                    volume={1.0}                 // 声音的放声音的放大倍数大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                    muted={false}                // true代表静音，默认为false.
                    paused={false}               // true代表暂停，默认为false
                    resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
                    repeat={false}                // 是否重复播放
                    playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                    onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
                    onLoad={data => this.setDuration(data)}     // 当视频加载完毕时的回调函数
                    onProgress={e => this.setTime(e)}    //  进度控制，每250ms调用一次，以获取视频播放的进度
                    onEnd={this.onEnd}           // 当视频播放完毕后的回调函数
                    onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                    playWhenInactive={true}
                    style={styles.backgroundVideo}
                />
                <ImageBackground source={tape} style={{height:250,width:250,justifyContent:"center",alignItems:"center"}}>
                    <Image source={{uri:this.state.al.picUrl}} style={{width:170,height:170,borderRadius:85}}  />                
                </ImageBackground>
                {
                    this._getVideoState()
                }
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
                </View>
    }
    componentDidMount(){
        this.setState({
            data:this.props.navigation.state.params.detail
        })
        const id = this.props.navigation.state.params.detail.id;
        this._getMusicDetail(id)
    }
    _getMusicDetail(id){
        fetch(`http://musicapi.leanapp.cn/song/detail?ids=${id}`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                al:responseData.songs[0].al,
                mark:responseData.songs[0].mark,
                songs:responseData.songs[0]
            })
        })
        .catch(function(e) {
            
        });
    }
    _getLyric(id){ // 歌词
        fetch(`http://musicapi.leanapp.cn/lyric?id=${id}`)
        .then((response) => response.json())
        .then((responseData) => {
            // this.setState({
            //     al:responseData.songs[0].al,
            //     mark:responseData.songs[0].mark,
            //     songs:responseData.songs[0]
            // })
        })
        .catch(function(e) {
            console.log(e)
        });
    }
}


const styles = StyleSheet.create({
    progress:{
        height:36,
        position:"absolute",
        paddingRight:10,
        paddingLeft:10,
        bottom:60,
        left:0,
        zIndex:999,
        width:'100%',
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-between"
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
    headTitle:{
        position:"absolute",
        flexDirection: 'row',
        width:ScreenWidth,
        top:0,
        left:0,
        height:40,
        alignItems:"center",
        justifyContent:"space-between",
        borderBottomColor:"#fff",
        borderBottomWidth:0.5,
        paddingLeft:10,
        paddingRight:10
    }
});

export default MusicPlay;