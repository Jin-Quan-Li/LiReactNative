import React, { Component } from 'react';
import {
	View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

class PoemSong extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'文字',
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
        this._keyExtractor = this._keyExtractor.bind(this);
    }
    render() { 
        const data = this.state.data;
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
                    <TouchableOpacity style={{marginBottom:30,paddingLeft:10,paddingRight:10}} onPress={() => { }}>
                        <View style={{flexDirection: 'row',justifyContent:"center"}}>
                            <Text style={{fontWeight:"bold",fontSize:16,marginRight:10}}>{item.name}</Text>
                            <Text style={{fontSize:13,color:"#666"}}>{item.passtime}</Text>
                        </View>
                        <Text style={{lineHeight:20,color:"#666",marginTop:10}}>{item.text}</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
    _onPressButton(item){

    }
    _keyExtractor = (item, index) => index + ''
    _getData(){
        fetch(`https://api.apiopen.top/getJoke?type=text&page=${this.state.page}&count=20`)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            this.setState({
                data:[...this.state.data,...responseData.result],
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

}
export default PoemSong;