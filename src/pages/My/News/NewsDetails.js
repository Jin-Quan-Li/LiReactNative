import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
	View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import WebView from 'react-native-webview';

class NewsDetails extends Component {
    static navigationOptions = ({ navigation }) =>({
        headerTitle:'网易新闻',
        // gestureEnabled:true
    })
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            data:{}
        }
    }
    render() { 
        // 加载中
        // if( this.state.isLoading ){
        //     return <View style={[styles.activity, styles.horizontal]}>
        //             <ActivityIndicator size="small" color="green" />
        //             <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
        //         </View>
        // }
        return ( 
            <WebView source={{ uri: this.state.data.path }} onLoadEnd={ () => { this.setState({isLoading:false}) }} />
        );
    }
    _onPressButton(item){

    }
    componentDidMount(){
        this.setState({
            data:this.props.navigation.state.params.detail
        })
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


export default NewsDetails;