import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

class Mv extends Component {
    static navigationOptions = {
        title:'Mv排行'
    }
    constructor(props) {
        super(props);
        this.state = { 
            mvData:[],
            data:[
                {
                    list:[],
                    key:'1'
                }
            ],
            isLoading:true
        }
        this._getMvData == this._getMvData.bind(this);
        this.handleChangeMv = this.handleChangeMv.bind(this);
    }
    render() { 
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        const mvData = this.state.mvData;
        return ( 
            <View>
                <FlatList
                    style={{padding:10}}
                    data={this.state.data}
                    renderItem={({itemName,i}) => 
                        <View style={styles.container}>
                            {
                                mvData.map((item,index) => {
                                    return (
                                        <TouchableOpacity style={styles.item} key={index} onPress={() => { this.handleChangeMv(item) }}>
                                            <View style={{width:'100%', height: 120}}>
                                                <Image source={{uri:item.cover}} style={{width:'100%', height: 120,borderRadius:4}}  />
                                            </View>
                                            <Text numberOfLines={2}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    }
                />
            </View>
        );
    }
    handleChangeMv(item){
        this.props.navigation.navigate('MvPlay', {detail: {
            ...item
        }})
    }
    componentDidMount(){
        this._getMvData()//Mv排行
    }
    _getMvData(){
        fetch(`http://musicapi.leanapp.cn/top/mv?limit=30`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                mvData:responseData.data,
                isLoading:false
            })
        })
        .catch(function(e) {
            
        });
    }
}

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
    },
    horizontal: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        padding: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:"space-between"
    },
    item:{
        width:'32%',
        marginBottom:14
    }
});

export default Mv;
