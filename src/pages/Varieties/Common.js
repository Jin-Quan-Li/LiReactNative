import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    TouchableOpacity
} from 'react-native';


class Common extends Component {
    constructor(props) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this)
    }
    render() { 
        const data = this.props.data;
        return ( 
            <View style={styles.container}>
                {
                    data.map((item,index) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => { this._onPressButton(item) }} key={index}>
                                <Text style={styles.itemTitle}>{item.name}</Text>
                                <Text style={styles.itemNum}>{item.bookCount}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
    _onPressButton(item){
        this.props.navigation.navigate('Details', {detail: {
            ...item,
            gender:this.props.gender
        }})
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    item:{
        width:'33.33%',
        marginTop:20
    },
    itemTitle:{
        textAlign:'center',
        fontWeight:'bold'
    },
    itemNum:{
        textAlign:'center',
        lineHeight:25,
        color:"#666"
    }
});

export default Common;