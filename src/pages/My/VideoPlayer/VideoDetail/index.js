import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class VideoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:{},
            basic:{},
            advertisement:{},
            boxOffice:{},
            live:{},
            related:{},
            isLoading:true
        }
        this._onPressButton = this._onPressButton.bind(this);
    }
    static navigationOptions = ({ navigation }) =>({
        headerShown:false
    })
    render() {
        const { basic, isLoading } = this.state;
        if( isLoading ){
            return (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="green" />
                </View>
            )
        }
        return (
            <View>
                <ScrollView style={{height:702}}>
                    <ImageBackground source={{uri:basic.img}} style={{width: '100%', height:130}}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                <AntDesign name="left" color={'#fff'} size={22} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                <FontAwesome name="share-square-o" color={'#fff'} size={22} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={styles.movie}>
                        <TouchableOpacity style={styles.play} onPress={() => { this._onPressButton(basic) }}>
                            <Image source={{uri:basic.img}} style={styles.Image} />
                            <AntDesign name="playcircleo" color={'#fff'} size={36} />
                        </TouchableOpacity>
                        <View style={{paddingLeft:10,flexDirection: 'row',justifyContent:"space-between",alignItems:"center",flex:1}}>
                            <View>
                                <Text style={[styles.margin,styles.name]}>{basic.name}</Text>
                                <Text style={styles.margin}>Youth</Text>
                                <Text style={styles.margin}>{basic.mins}</Text>
                                <View style={{flexDirection: 'row',paddingBottom:2}}>
                                    {
                                        basic.type && basic.type.map((item,index) => {
                                            return <Text style={{marginRight:10}} key={index}>{item}</Text>
                                        })
                                    }
                                </View>
                                <Text style={styles.margin}>{basic.releaseDate} - {basic.releaseArea}上映</Text>
                                <Text style={styles.margin}>@{basic.commentSpecial}</Text>
                                <View style={{flexDirection: 'row',marginTop:5}}>
                                    <Text style={styles.label}>中国巨幕</Text>
                                    <Text style={styles.label}>IMAX</Text>
                                </View>
                            </View>
                            <Text style={{position:"absolute",right:0,top:20,width:40,height:40,lineHeight:40,textAlign:"center",color:"#fff",backgroundColor:"green"}}>{basic.overallRating}</Text>
                        </View>
                    </View>
                    <View style={{padding:10,borderTopColor:"#ddd",borderTopWidth:10}}>
                        <Text style={{lineHeight:24}}>剧情：{basic.story}</Text>
                    </View>
                    <View style={{paddingBottom:4,borderTopColor:"#ddd",borderTopWidth:10,paddingLeft:10,paddingRight:10}}>
                        <Text style={{lineHeight:30}}>导演</Text>
                        {
                            basic.director && <View style={{width:100}}>
                                                    <Image source={{uri:basic.director.img}} style={{width:100,height:100}} />
                                                    <Text numberOfLines={1} style={{textAlign:"center",fontSize:12}}>{basic.director.name}</Text>
                                                    <Text numberOfLines={1} style={{textAlign:"center",fontSize:12}}>{basic.director.nameEn}</Text>
                                                </View>
                        }
                    </View>
                    <View style={{paddingBottom:10,borderTopColor:"#ddd",borderTopWidth:10,paddingLeft:10,paddingRight:10}}>
                        <Text style={{lineHeight:30}}>演员表</Text>
                        <ScrollView horizontal={true}>
                            {
                                basic.actors && basic.actors.map((item,index) =>{
                                    return  item.name && item.roleName ? <View style={{width:100,marginRight:10}} key={index}>
                                                <Image source={{uri:item.img}} style={{width:100,height:100}} />
                                                <Text numberOfLines={1} style={{fontSize:12,lineHeight:20}}>演员:{item.name}</Text>
                                                <Text numberOfLines={1} style={{fontSize:12}}>角色:{item.roleName}</Text>
                                            </View> : null
                                })
                            }
                        </ScrollView>
                    </View>
                </ScrollView>
                <View style={styles.end}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <View style={styles.operation}>
                            <Feather name="heart" color={'#fff'} size={18} />
                            <Text style={styles.text}>想看</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{alignItems:"center",backgroundColor:"#ddd",justifyContent:"center"}}>
                        <Text style={{width:1,height:26,backgroundColor:"#666"}}></Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <View style={styles.operation}>
                            <FontAwesome name="comments" color={'#fff'} size={19} />
                            <Text style={styles.text}>评论</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={() => { this.props.navigation.goBack() }}>
                        <Text style={{backgroundColor:"green",lineHeight:50,textAlign:"center",color:"#fff"}}>
                            选座购票
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _onPressButton(item){
        this.props.navigation.navigate('Trivia', {detail:item})
    }
    componentDidMount(){
        this._getData()
    }
    _getData(){
        const id = this.props.navigation.state.params.detail.id;
        const URL = `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=${id}`
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data:responseData.data,
                basic:responseData.data.basic,
                advertisement:responseData.data.advertisement,
                boxOffice:responseData.data.boxOffice,
                live:responseData.data.live,
                related:responseData.data.related,
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
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    header:{
        justifyContent:"space-between",
        flexDirection: 'row',
        height:50,
        alignItems:"center",
        paddingLeft:10,
        paddingRight:10
    },
    movie:{
        flexDirection: 'row',
        paddingBottom:14,
        paddingTop:14,
        paddingRight:10,
        paddingLeft:10
    },
    play:{
        position:'relative',
        top:0,
        left:0,
        alignItems:"center",
        width:120,
        height:154,
        justifyContent:"center"
    },
    Image:{
        position:"absolute",
        top:0,
        left:0,
        width:120,
        height:154,
    },
    label:{
        height:20,
        lineHeight:20,
        borderColor:"#666",
        borderWidth:1,
        paddingRight:4,
        paddingLeft:4,
        color:"#666",
        fontSize:12,
        marginRight:16
    },
    margin:{
        marginBottom:2
    },
    name:{
        fontWeight:"bold"
    },
    end:{
        flexDirection: 'row',
        height:50,
        justifyContent:"space-between"
    },
    operation:{
        width:90,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ddd"
    },
    text:{
        textAlign:"center",
        color:"#666"
    }
})

export default VideoDetail;