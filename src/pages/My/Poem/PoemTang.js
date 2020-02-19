import React, { Component } from 'react';
import {
	View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    FlatList,
    TouchableOpacity
} from 'react-native';
import VideoComments from "./VideoComments.js";
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

class PoemTang extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'视频',
        // gestureEnabled:true
    })
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            data:[],
            page:1,
            showFoot:0
        }
        this.handleChangePlay = this.handleChangePlay.bind(this);
        
        this._keyExtractor = this._keyExtractor.bind(this);
    }
    render() { 
        return ( 
            <FlatList
                style={{width:ScreenWidth,height:ScreenHeight}}
                keyExtractor={this._keyExtractor}
                data={this.state.data}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                ListFooterComponent={this._renderFooter}
                onEndReached={this._onEndReached}
                onEndReachedThreshold={0.1}
                renderItem={({item,index}) => 
                    <TouchableOpacity style={{marginBottom:20}} onPress={() => { }}>
                        <VideoComments 
                            key={index} 
                            url={item.video} 
                            isPlay={item.isPlay}
                            index={index}
                            text={item.text}
                            handleChangePlay={(i,isPlay) => {
                                this.handleChangePlay(i,isPlay)
                            }}
                        />
                    </TouchableOpacity>
                }
            />
        );
    }
    _keyExtractor = (item, index) => item.sid
    _onPressButton(item){

    }
    _getData(){
        fetch(`https://api.apiopen.top/getJoke?type=video&page=${this.state.page}&count=10`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data:[...this.state.data,...responseData.result.map((item,index) => {
                    item.text = item.text.replace(/[\r\n]/g,"，");
                    return item
                })],
                page:this.state.page + 1,
                showFoot:0
            })
        })
        .catch(function(e) {
            this.setState({
                isLoading:false
            })
        });
    }
    componentDidMount(){
        this._getData()
        // 添加页面失去焦点
        this.viewDidAppear = this.props.navigation.addListener(
            'willBlur',
            (obj)=>{
                this.setState({
                    data:[...this.state.data.map((item,index) =>{
                        item.isPlay = false;
                        return item
                    })]
                })
            }
        )

        // 添加页面获取焦点
        this.didFocus = this.props.navigation.addListener(
            'didFocus',
            ()=>{
                
            }
        )
    }
    handleChangePlay(i,isPlay){
        this.setState({
            data:[...this.state.data.map((item,index) =>{
                if(index === i){
                    item.isPlay = isPlay;
                }else {
                    item.isPlay = false;
                }
                return item
            })]
        })
    }
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
        //底部显示正在加载更多数据
        this.setState({
            showFoot:2
        });
        //获取数据，在componentDidMount()已经请求过数据了
        if (this.state.page > 1){
            this._getData()
        }
    }
    componentWillUnmount(){
        
    }

}
export default PoemTang;