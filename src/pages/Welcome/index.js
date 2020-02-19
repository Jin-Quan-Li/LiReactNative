import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		position:'relative',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#C20C0C',
	},
	tips: {
		fontSize: 30,
		color: '#fff',
	},
	countdown:{
		position:'absolute',
		right:20,
		top:20,
		width:30,
		height:30,
		borderWidth:1,
		color:"#fff",
		textAlign:'center',
		lineHeight:30,
		borderRadius:15,
		borderColor:'#666'
	}
});

class Welcome extends Component {
	constructor(props) {
        super(props);
        this.state = { 
			countdown:3
		}
    }
	componentDidMount() {
		setInterval(() =>{
			if( this.state.countdown <= 1 ){
				this.props.navigation.navigate('Main');
				return
			}
			this.setState({
				countdown:this.state.countdown - 1
			})
		},1000)
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.tips}> 追 </Text>
				<Text style={styles.tips}> 书 </Text>
				<Text style={styles.tips}> 神 </Text>
				<Text style={styles.tips}> 器 </Text>
				<Text style={styles.countdown}>{this.state.countdown }</Text>
			</View>
		);
	}
}


export default Welcome;
