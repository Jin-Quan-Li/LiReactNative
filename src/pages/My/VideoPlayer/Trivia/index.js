import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Trivia extends Component {
    static navigationOptions = {
        title:'预告片&拍摄花絮',
        headerTintColor:"#fff",
        headerStyle:{
            backgroundColor:"#222"
        }
    }
    constructor(props) {
        super(props);
        this.state = { 
            data:[],
            isLoading:true
        }
        this._getData = this._getData.bind(this);
    }
    render() {
        const { data, isLoading } = this.state;
        if( isLoading ){
            return (
                <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            )
        }
        return ( 
            <FlatList
                data={this.state.data}
                keyExtractor={this._keyExtractor}
                renderItem={({item,index}) => 
                    <TouchableOpacity style={styles.container} onPress={() => { this._onPressButton(item) }}>
                        <ImageBackground source={{uri:item.image}} style={{width: 120, height:80,justifyContent:"center",alignItems:"center"}}>
                            <AntDesign name="playcircleo" color={'#fff'} size={30} />
                        </ImageBackground>
                        <View style={{justifyContent:"center",marginLeft:10}}>
                            <Text style={{lineHeight:30,fontSize:14,fontWeight:"bold"}}>{item.title}</Text>
                            <Text style={{lineHeight:30,fontSize:14,color:"#666"}}>片长：{item.length}</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
        );
    }
    _onPressButton(item){
        this.props.navigation.navigate('VideoPlay', {detail:item})
    }
    _keyExtractor = (item, index) => index + ''
    componentDidMount(){
        this._getData()
    }
    _getData(){
        const { movieId } = this.props.navigation.state.params.detail;
        fetch(`https://api-m.mtime.cn/Movie/Video.api?pageIndex=1&movieId=${movieId}`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data:responseData.videoList,
                isLoading:false
            })
        })
        .catch(function(e) {
            this.setState({
                isLoading:false
            })
        });
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding:10,
        borderBottomColor:"#ddd",
        borderBottomWidth:0.5,
        backgroundColor:"#fff"
    },
    activity: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
}); 
export default Trivia;