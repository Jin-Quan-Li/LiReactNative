import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text
} from 'react-native';
import RankingList from './RankingList.js';
class Weeks extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'周榜',
        gestureEnabled:true
    })
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <RankingList _id={this.props.navigation.state.params.detail._id} navigation={this.props.navigation}  />
        );
    }
    componentDidMount(){
        
    }
}
 
export default Weeks;