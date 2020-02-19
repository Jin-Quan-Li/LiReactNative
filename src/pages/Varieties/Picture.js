import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    ActivityIndicator
} from 'react-native';

import Common from './Common.js'
const REQUEST_URL = "http://api.zhuishushenqi.com/cats/lv2/statistics";


class Picture extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            picture:[],
            isLoading:true
        }
    }
    static navigationOptions = {
        title:'漫画',
        headerShown:false
    }
    render() { 
        const { picture, isLoading } = this.state;
        if( !picture.length && isLoading ){
            return (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#aaa" />
                </View>
            )
        }
        return <Common data={picture} navigation={this.props.navigation} gender={"picture"} />
    }
    componentDidMount(){
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                picture:responseData.picture,
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

export default Picture;