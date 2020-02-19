import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
const REQUEST_URL = 'https://api.zhuishushenqi.com/book/by-categories';
const staticPath = 'http://statics.zhuishushenqi.com';

class RankingList extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            data:[],
            refreshing:true
        }
    }
    render() { 
        return ( 
            <FlatList
                data={this.state.data}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                color="#0000ff"
                renderItem={({item,index}) => 
                    <TouchableOpacity style={styles.container} onPress={() => { this._onPressButton(item) }}>
                        <View>
                            <Image source={ item.cover } style={{width: 80, height: 100}}  />
                        </View>
                        <View style={{flex:1,marginLeft:10,height: 100,paddingTop:6}}>
                            <Text style={{fontWeight:'bold'}}>{item.title}</Text>
                            <Text style={styles.item}>{item.author}</Text>
                            <Text numberOfLines={1} style={styles.item}>{item.shortIntro}</Text>
                            <Text style={styles.item}>{item.latelyFollower}阅读，{item.retentionRatio}%读者留存</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
        );
    }
    _onPressButton(item){
        this.props.navigation.navigate('Introduce', {detail: item})
    }
    _onRefresh(){

    }
    _getData(){
        const _id = this.props._id;
        const URL = `http://api.zhuishushenqi.com/ranking/${_id}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data:responseData.ranking.books.map((item,index) => {
                    item.cover = {uri:`${staticPath}${item.cover}`};
                    item.key = index + '';
                    return item
                }),
                refreshing:false
            })
        })
        .catch(( err ) => {
           this.setState({
                refreshing:false
           })
        })
    }
    componentDidMount(){
        this._getData()
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom:10,
        padding:10
    },
    item:{
        lineHeight:26
    }
});

export default RankingList;