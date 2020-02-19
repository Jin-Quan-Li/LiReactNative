import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather'
import {
	StyleSheet,
	View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

const imgurl = 'http://statics.zhuishushenqi.com'

class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[]
        }
    }
    static navigationOptions = {
        title: '排行',
        tabBarIcon:({tintColor}) => {
            return <Feather name="bar-chart" color={tintColor} size={24} />
        }
    }
    // RankingList
    render() { 
        return ( 
            <FlatList
                    data={this.state.data}
                    renderItem={({item,index}) => 
                        <View>
                            <View>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </View>
                            {
                                item.list.map((itemName,index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => { this._onPress(itemName) }}>
                                            <View style={styles.itemName}>
                                                <Image source={{uri:imgurl + itemName.cover }} style={styles.itemNameImages} />
                                                <Text style={styles.itemNameText}>{itemName.shortTitle}</Text>
                                                <Text style={styles.itemNameText}>{itemName.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    }
                />
        );
    }
    _getData(){
        const URL = `http://api.zhuishushenqi.com/ranking/gender`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data:[
                    {
                        title:'男生',
                        list:responseData.male,
                        key:'男生'
                    },{
                        title:'女生',
                        list:responseData.female,
                        key:'女生'
                    },{
                        title:'出版',
                        list:responseData.epub,
                        key:'出版'
                    }
                ]
            },() => {
            })
        })
        .catch(( err ) => {
           
        })
    }
    componentDidMount(){
        this._getData()
    }
    _onPress(item){
        this.props.navigation.navigate('RankingTop', {detail: item})
    }
}

const styles = StyleSheet.create({
    wrapper:{
        padding:10
    },
    itemTitle:{
        backgroundColor:"#ddd",
        lineHeight:46,
        paddingLeft:16,
        fontSize:14,
        fontWeight:'bold'
    },
    itemName:{
        height:46,
        paddingLeft:16,
        flexDirection: 'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:"#ddd"
    },
    itemNameText:{
        height:46,
        lineHeight:46,
        marginRight:10
    },
    itemNameImages:{
        width:20,
        height:20,
        borderRadius:10,
        overflow:'hidden',
        marginRight:14,
    }
});

export default Ranking;