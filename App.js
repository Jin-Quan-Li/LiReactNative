/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Navigation from './src/pages';
import Toast, {DURATION} from 'react-native-easy-toast';
import {
	View
} from 'react-native';
//所有子页面均可直接调用global.toast("")来吐司提示消息
global.toast = false;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() { 
		// return <Navigation />
		return (<View style={{flex:1}}>
            <Navigation />
            <Toast ref="toast" opacity={1}/>
        </View>)
	}
	componentDidMount() {
		//封装全局方法
		global.toast = (message) => {
			this.refs.toast.show(message);
		}
	}
}

export default App;
