import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
	StyleSheet,
	View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator

} from 'react-native';

class News extends Component {
    static navigationOptions = ({ navigation }) =>({
        headerTitle:'网易新闻',
        // gestureEnabled:true
    })
    constructor(props) {
        super(props);
        this.state = { 
            result:[],
            refreshing:true,
            page:1,
            count:1000,
            isLoading:true
        }
        this._getNewsData = this._getNewsData.bind(this);
        this._onPressButton = this._onPressButton.bind(this);
    }
    render() { 
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        const { result } = this.state;
        return ( 
            <FlatList
                data={this.state.result}
                renderItem={({item,index}) => 
                    <TouchableOpacity style={{paddingLeft:10,paddingRight:10,marginTop:10,marginBottom:10}} onPress={() => { this._onPressButton(item) }}>
                        <Text numberOfLines={1} style={{width:"100%",textAlign:"center",fontSize:16,fontWeight:"bold"}}>{item.title}</Text>
                        <Text style={{width:"100%",fontSize:14,color:"#666",textAlign:"center",lineHeight:30}}>{item.passtime}</Text>
                        <Image source={{uri:item.image}} style={{width: '100%',height:200}}  />
                    </TouchableOpacity>
                }
            />
        );
    }
    _onPressButton(item){
        this.props.navigation.navigate('NewsDetails', {detail: {
            ...item
        }})
    }
    componentDidMount(){
        this._getNewsData()
    }
    _getNewsData(){
        fetch(`https://api.apiopen.top/getWangYiNews?page=${this.state.page}&count=${this.state.count}`)
        .then((response) => response.json())
        .then((responseData) => {
            console.log("新闻")
            console.log(responseData)
            this.setState({
                result:responseData.result,
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
        padding: 10
    }
})


export default News;