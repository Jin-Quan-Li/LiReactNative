import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import Common from './Common.js'
const REQUEST_URL = "http://api.zhuishushenqi.com/cats/lv2/statistics";

class Female extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            female:[]
        }
    }
    static navigationOptions = {
        title:'女生',
        headerShown:false
    }
    render() { 
        const female = this.state.female;
        return <Common data={female} navigation={this.props.navigation} gender={"female"} />
    }
    componentDidMount(){
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                female:responseData.female

            })
        });
    }
}

export default Female;