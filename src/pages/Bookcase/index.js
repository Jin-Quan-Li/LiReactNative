import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
const REQUEST_URL = 'http://api.zhuishushenqi.com/book/';

import {
	StyleSheet,
	View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

class Bookcase extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[],
            refreshing:false
        }
    }
    static navigationOptions = {
        title: '书架',
        tabBarIcon:({tintColor}) => {
            return <Feather name="book-open" color={tintColor} size={24} />
        }
    }
    render() { 
        return ( 
            <View>
                <FlatList
                    data={this.state.data}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._retrieveData() }
                    renderItem={({item,index}) => 
                        <TouchableOpacity style={styles.container} onPress={() => { this._onPressButton(item) }}>
                            <View>
                                <Image source={ item.cover } style={{width: 80, height: 100}}  />
                            </View>
                            <View style={{flex:1,marginLeft:10,height: 100,justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold',lineHeight:24}}>{item.title}</Text>
                                <Text numberOfLines={1} style={styles.item}>{item.updated}:{item.lastChapter}</Text>
                                <Text style={styles.item}>{item.latelyFollower}阅读，{item.retentionRatio}读者留存</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
    _retrieveData = async () => {
        try {
            this.setState({
                refreshing:true
            })
            // AsyncStorage.removeItem("data")
            const value = await AsyncStorage.getItem('data');
            if (value !== null) {
                this.setState({
                    data:JSON.parse(value).map((item,index) => {
                        item.key = index + '';
                        return item
                    }),
                    refreshing:false
                })
            }
        } catch (error) {
            this.setState({
                refreshing:true
            })
        }
    }
    _onPressButton(item){
        this.props.navigation.navigate('Introduce', {detail: item})
    }
    componentDidMount(){
        this._retrieveData()
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft:10,
        paddingRight:10,
        marginTop:10
    },
    item:{
        lineHeight:24
    }
});

export default Bookcase;