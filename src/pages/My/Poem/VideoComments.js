import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

class VideoComments extends Component {
    constructor(props){
        super(props);

        this.state={
            // isPlay:this.props.isPlay,
            data:{},
            isLoading:true,
            currentTime: 0.0,                 //当前播放的时间
            paused: 1.0,                      //播放
            sliderValue: 0,                   //进度条的进度
            duration: 0.0,
            isShow:true
            
        };
        this.loadStart = this.loadStart.bind(this);
        this.setDuration = this.setDuration.bind(this);
        this.setTime = this.setTime.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.videoError = this.videoError.bind(this);
        this._getVideoState = this._getVideoState.bind(this);
        this.formatMediaTime = this.formatMediaTime.bind(this);
        this.handleChangePlay = this.handleChangePlay.bind(this);
        this.handleModal = this.handleModal.bind(this);
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
        this.props.handleChangePlay(this.props.index,false)
    }
    videoError(){
        console.log('视频播放出错');
    }
    render() { 
        const { duration, currentTime } = this.state.data;
        const { url, isPlay, text } = this.props;
        if( !url ){
            return null
        }
        return (  
            <View>
                <View style={[styles.container,{width:ScreenWidth,height:250}]}>
                    <Video
                        source={{uri:url}} // 视频的URL地址，或者本地地址，都可以
                        ref='player'
                        rate={isPlay ? 1 : 0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                        volume={1.0}                 // 声音的放声音的放大倍数大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                        muted={false}                // true代表静音，默认为false.
                        paused={false}               // true代表暂停，默认为false
                        resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
                        repeat={false}                // 是否重复播放
                        playInBackground={true}     // 当app转到后台运行的时候，播放是否暂停
                        playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                        onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
                        onLoad={data => this.setDuration(data)}     // 当视频加载完毕时的回调函数
                        onProgress={e => this.setTime(e)}    //  进度控制，每250ms调用一次，以获取视频播放的进度
                        onEnd={this.onEnd}           // 当视频播放完毕后的回调函数
                        onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                        playWhenInactive={true}
                        style={styles.backgroundVideo}
                    />
                    <TouchableOpacity style={styles.modal} onPress={() => { this.handleModal() }}>
                        {
                            !this.state.isLoading && this.state.isShow && <Text numberOfLines={2} style={{padding:10,fontSize:16,fontWeight:"bold",color:"#fff",position:"absolute",top:0,left:0}}>{text}</Text>
                        }
                        {
                            this.isPlayFnct()
                        }
                        {
                            this._getVideoState()
                        }
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    isPlayFnct(){
        if( this.state.isLoading){
            return
        }
        if(!this.props.isPlay) {
            return  <TouchableOpacity onPress={() => { this.handleChangePlay() }} style={[styles.activity, styles.horizontal]}>
                        <AntDesign name="caretright" color={'#fff'} size={50} />
                    </TouchableOpacity>
        }
        if( !this.state.isShow ) {
            return
        }
        return  <TouchableOpacity onPress={() => { this.handleChangePlay() }} style={[styles.activity, styles.horizontal]}>
                    <Entypo name="controller-paus" color={'#fff'} size={50} />
                </TouchableOpacity>
    }
    _getVideoState(){
        if( !this.state.isShow ){
            return
        }
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
                        {/* {
                            this.state.isPlay ? <AntDesign name="pause" color={'#fff'} size={24} /> : <AntDesign name="caretright" color={'#fff'} size={24} />
                        } */}
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
        
    }
    handleModal(){  
        this.timer && clearTimeout(this.timer);
        this.setState({
            isShow:!this.state.isShow
        },() => {
            if(this.state.isShow){
                this.timer = setTimeout(() => {
                    this.setState({
                        isShow:false
                    })
                }, 3000);
            }
        })
    }
    // 点击播放暂停的回调
    handleChangePlay(){
        this.handleModal()
        this.props.handleChangePlay(this.props.index,!this.props.isPlay)
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

}


const styles = StyleSheet.create({
    container: {
        // width:"100%",
        // height:260,
        backgroundColor:"#000"
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
        justifyContent:"space-between"
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

export default VideoComments;