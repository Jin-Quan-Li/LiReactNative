
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class MovieComingNew extends Component {
    static navigationOptions = {
        title:'即将上映',
        headerShown:false
    }
    constructor(props){
        super(props);
        this.state={
            refreshing:false,
            data:{}
        };
        this._getData = this._getData.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._onPressButton = this._onPressButton.bind(this);

    }
    render() {
        return (
            <FlatList
                data={this.state.data.moviecomings}
                keyExtractor={this._keyExtractor}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                renderItem={({item,index}) => 
                    <TouchableOpacity style={styles.container} onPress={() => { this._onPressButton(item) }}>
                        <View style={styles.flex}>
                            <View style={styles.play}>
                                <Image source={{uri:item.image}} style={styles.Image} />
                                <AntDesign name="playcircleo" color={'#fff'} size={28} />
                            </View>
                            <View style={[styles.flex,styles.center]}>
                                <View style={{width:200}}>
                                    <Text numberOfLines={1} style={{fontSize:16,fontWeight:'bold',lineHeight:20}}>{item.title}</Text>
                                    <View style={{flexDirection: 'row',alignItems:"center"}}>
                                        <Text style={{fontSize:16,color:"green",fontWeight:'bold'}}>{item.wantedCount}</Text>
                                        <Text style={{fontSize:12}}>人想看 - </Text>
                                        <Text style={{fontSize:12}}>{item.type}</Text>
                                    </View>
                                    <Text numberOfLines={1} style={{fontSize:12,color:"#666",lineHeight:20}}>{item.actor1} / {item.actor2}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity>
                                        <Text style={styles.order}>预售</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            />
        );
    }
    _keyExtractor = (item, index) => index + '';
    _onPressButton(item){
        this.props.navigation.navigate('VideoDetail', {detail: {
            ...item
        }})
    }
    _onRefresh(){
        this._getData()
    }
    componentDidMount(){
        this._getData()
    }
    _getData(){
        this.setState({
            refreshing:true
        })
        fetch('https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data:responseData,
                refreshing:false
            })
        })
        .catch(function(e) {
            this.setState({
                refreshing:false
            })
        });
    }
}

const styles = StyleSheet.create({
    container:{
        paddingRight:10,
        paddingLeft:10,
        marginTop:10,
        borderBottomColor:"#ddd",
        borderBottomWidth:0.5,
        paddingBottom:10
    },
    flex:{
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:"space-between",
        alignItems:'center'
    },
    center:{
        paddingLeft:10
    },
    order:{
        width:50,
        height:24,
        textAlign:'center',
        lineHeight:24,
        borderColor:'green',
        borderWidth:1,
        color:"green",
        borderRadius:2
    },
    play:{
        position:'relative',
        top:0,
        left:0,
        alignItems:"center",
        width:60,
        height:80,
        justifyContent:"center"
    },
    Image:{
        position:"absolute",
        top:0,
        left:0,
        width:60,
        height:80
    }
});

