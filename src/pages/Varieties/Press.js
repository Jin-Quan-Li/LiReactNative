
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    ActivityIndicator
} from 'react-native';

import Common from './Common.js'
const REQUEST_URL = "http://api.zhuishushenqi.com/cats/lv2/statistics";


class Press extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            press:[],
            isLoading:true
        }
    }
    static navigationOptions = {
        title:'出版',
        headerShown:false
    }
    render() { 
        const { press, isLoading } = this.state;
        if( !press.length && isLoading ){
            return (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#aaa" />
                </View>
            )
        }
        return <Common data={press} navigation={this.props.navigation} gender={"press"} />
    }
    componentDidMount(){
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                press:responseData.press,
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
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
})

export default Press;