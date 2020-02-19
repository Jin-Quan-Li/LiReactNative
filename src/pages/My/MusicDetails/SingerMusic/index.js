import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
	StyleSheet,
	View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Dimensions,
    ActivityIndicator
} from 'react-native';
let ScreenHeight = Dimensions.get('window').height;

class SingerMusic extends Component {
    static navigationOptions = ({ navigation }) =>({
        title:`${navigation.state.params.detail.name} - 单曲`
    })
    constructor(props) {
        super(props);
        this.state = { 
            artist:[],
            hotSongs:[],
            isLoading:true
        }
        this._getData = this._getData.bind(this);
        this.handleonPress = this.handleonPress.bind(this);
        this._keyExtractor = this._keyExtractor.bind(this);
        this._getMusicUrl = this._getMusicUrl.bind(this);
    }
    render() { 
        // 加载中
        if( this.state.isLoading ){
            return <View style={[styles.activity, styles.horizontal]}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={{fontSize:14,color:"green",marginLeft:6}}>正在努力加载</Text>
                </View>
        }
        const { artist, hotSongs } = this.state;
        return (
            <>
                <ImageBackground source={{uri:artist.img1v1Url}} style={{height:340,justifyContent:"center"}}>
                    <View style={styles.header}>
                        <View style={{flex:1,marginLeft:10,justifyContent:"center"}}>
                            <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>{artist.name}</Text> 
                            <Text numberOfLines={5} style={{fontSize:12,color:"#fff"}}>{artist.briefDesc}</Text>           
                        </View>
                    </View>
                </ImageBackground>
                <FlatList
                    data={hotSongs}
                    keyExtractor={this._keyExtractor}
                    style={styles.flatlist}
                    renderItem={({item,index}) => 
                        <TouchableOpacity onPress={() => { this.handleonPress(item.id,item.name) }} style={[styles.container,{borderBottomColor:"#ddd",borderBottomWidth:0.5}]} key={index}>
                            <View style={styles.container}>
                                <Text style={[styles.itemHeight,styles.color]}>{index + 1}</Text>
                                <View style={{marginLeft:10}}>
                                    <Text style={[styles.itemHeight,{fontSize:12,fontWeight:"bold"}]}>{item.name}</Text>
                                </View>
                            </View>
                            <View style={styles.icon}>
                                <AntDesign name="playcircleo" color={'#ddd'} size={20} />
                            </View>
                        </TouchableOpacity>
                    }
                />
            </>
        );
    }
    handleonPress(id,name){
        this._getMusicUrl(id,name)
    }
    _keyExtractor = (item, index) => index + ''
    componentDidMount(){
        const { id } = this.props.navigation.state.params.detail;
        this._getData(id)
    }
    _getMusicUrl(id,name){
        const URL = `http://musicapi.leanapp.cn/music/url?id=${id}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.props.navigation.navigate('MusicPlay', {detail:{
                url:responseData.data[0].url,
                name,
                id
            }})
        })
        .catch(function(e) {
            
        });
    }
    _getData(id){
        fetch(`http://musicapi.leanapp.cn/artists?id=${id}`)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                artist:responseData.artist,
                hotSongs:responseData.hotSongs,
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
    container: {
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:"space-between",
        height:50
    },
    itemHeight:{
        lineHeight:50
    },
    color:{
        color:"green"
    },
    icon:{
        justifyContent:"center",
        paddingRight:10
    },
    header:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10
    },
    tool:{
        flexDirection: 'row',
        marginTop:20
    },
    flatlist:{
        position:"absolute",
        left:0,
        bottom:0,
        height:474,
        width:"100%",
        borderTopRightRadius:16,
        borderTopLeftRadius:16,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#fff",
        overflow:"hidden"
    },
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
    },
    horizontal: {
        flexDirection: 'row',
        padding: 10
    }
});

export default SingerMusic;