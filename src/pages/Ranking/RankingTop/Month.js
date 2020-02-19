import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text
} from 'react-native';
import RankingList from './RankingList.js';
class Month extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'周榜',
        gestureEnabled:true
    })
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const _id = this.props.navigation.state.params.detail.monthRank || this.props.navigation.state.params.detail._id;
        return ( 
            <RankingList _id={_id} navigation={this.props.navigation} />
        );
    }
}
 
export default Month;