import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    ActivityIndicator
} from 'react-native';
import Common from './Common.js';
const REQUEST_URL = "http://api.zhuishushenqi.com/cats/lv2/statistics";


class Male extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            male:[],
            isLoading:true
        }
    }
    static navigationOptions = {
        title:'男生',
        headerShown:false
    }
    render() { 
        const { male, isLoading } = this.state;
        if( !male.length && isLoading ){
            return (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return <Common data={male} navigation={this.props.navigation} gender='male' />
    }
    componentDidMount(){
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                male:responseData.male,
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

export default Male;