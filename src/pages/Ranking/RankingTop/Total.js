import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text
} from 'react-native';
import RankingList from './RankingList.js';
class Total extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:'周榜',
        gestureEnabled:true
    })
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const _id = this.props.navigation.state.params.detail.totalRank || this.props.navigation.state.params.detail._id;
        return ( 
            <RankingList _id={_id} navigation={this.props.navigation} />
        );
    }
}
 
export default Total;