import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    Image,
    Button,
    ActivityIndicator,
    Linking,
    ToastAndroid,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AlertView from '../../../component/AlertView';
import { ActionSheet, ActionDom }  from '../../../component/Actionsheet';
const REQUEST_URL = 'http://api.zhuishushenqi.com/book/';

import util from '../../../utils/util.js';


class Introduce extends Component {
    static navigationOptions = ({ navigation }) =>({
        headerTitle:navigation.state.params.detail.title,
        gestureEnabled:true
    })
    constructor(props) {
        super(props);
        this.state = { 
            data:{},
            loading:true,
            isShowAlert:false,
            content:'添加到书架？',
            showAction:false,
            actions:[],//小说源
            chapter:[]//小说章节
        }
        this.onPressLearnMore = this.onPressLearnMore.bind(this);
        this._getDataChapters = this._getDataChapters.bind(this);
    }
    render() { 
        if( this.state.loading ) {
            return (
                <View style={[styles.containerIcon, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        const { _id, cover, author, title, updated, totalFollower, minorCate, retentionRatio,wordCount,serializeWordCount, tags, longIntro, latelyFollower } = this.state.data;
        return ( 
            <>
                <ActionSheet
                    showAction={this.state.showAction}
                    cancel={()=>{this.setState({showAction:false})}}
                    >
                        {
                            this.state.actions.map((item,index) => {
                                return  <ActionDom
                                            key={index}
                                            actionName={`${item.name}' '${item.lastChapter}`}
                                            onPress={()=>{
                                                this._getDataChapters(item)
                                            }}
                                        />
                            })
                        }
                </ActionSheet>

                <AlertView isShow={this.state.isShowAlert}
                    message={this.state.content}
                    leftButton={this.leftButton()}
                    rightButton={this.rightButton()}/>


                <View style={{paddingRight:10,paddingLeft:10,backgroundColor:'#fff',height:'100%'}}>
                    <View style={styles.head}>
                        <View style={styles.item}>
                            <Image source={cover}
            style={{width: 80, height: 100}} />
                            <View style={styles.container}>
                                <Text style={{fontWeight:'bold',fontSize:16}}>{title}</Text>
                                <Text style={{fontSize:14,marginTop:4}}>{author}</Text>
                                <View style={styles.wrapper}>
                                    <Text style={[styles.itemText,styles.border]}>{updated}</Text>
                                    <Text style={[styles.itemText,styles.border]}>{wordCount}</Text>
                                    <Text style={styles.itemText}>{minorCate}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <View style={styles.button}>
                                <Button
                                    onPress={() => this.onPressLearnMore()}
                                    title="追更新"
                                    color="blue"
                                    accessibilityLabel="追更新"
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    onPress={()=>{this.setState({showAction:true})}}
                                    title="开始阅读"
                                    color="blue"
                                    accessibilityLabel="开始阅读"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerTitle}>
                        <View style={styles.itemTitle}>
                            <Text style={styles.textAling}>追书人气</Text>
                            <Text style={{textAlign:'center'}}>{totalFollower}</Text>
                        </View>
                        <View style={styles.itemTitle}>
                            <Text style={styles.textAling}>读者留存率</Text>
                            <Text style={{textAlign:'center'}}>{retentionRatio}%</Text>
                        </View>
                        <View style={styles.itemTitle}>
                            <Text style={styles.textAling}>日更新字数</Text>
                            <Text style={{textAlign:'center'}}>{latelyFollower}</Text>
                        </View>
                    </View>
                    <View style={styles.tag}> 
                        {
                            tags && tags.map((item,index) => {
                                return <Text style={styles.text} key={index}>{item}</Text>
                            })
                        }
                    </View>
                    <Text style={{padding:10}}>{longIntro}</Text>
                </View>
            </>
        );
    }
    // 获取小说章节
    _getDataChapters(item){
        const URL = `http://api.zhuishushenqi.com/atoc/${item._id}?view=chapters`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            const chapter = [...responseData.chapters.map((item,index) =>{
                        item.key = index + '';
                        return item
                    })]

            this.setState({
                showAction:false,
                chapter
            })
            this.props.navigation.navigate('ContentDrawerNavigator', {detail:{
                list:chapter,
                title:this.state.data.title,
                link:chapter[0].link
            }})

        })
        .catch(( err ) => {
            
        })
    }
    _storeData = async (data) => {
        try {
            const value = await AsyncStorage.getItem('data'); //
            if( value !== null) { //有缓存
                const isFilter = JSON.parse(value).filter( item => item._id === data._id ).length;//判断现有的缓存是否包含这条数据
                if( !isFilter ) {
                    const list = [data,...JSON.parse(value)]; //没有就push 然后再缓存
                    await AsyncStorage.setItem('data', JSON.stringify(list));//
                    this.toast('添加成功!'); 
                    return
                }
                this.toast('添加成功!'); 
                return
            }

            await AsyncStorage.setItem('data', JSON.stringify([data]));//存储添加data
            this.toast('添加成功!'); 
        } catch (error) {
            // Error saving data
        }
    }
    toast(message){
        if( Platform.OS == 'IOS' ){
            global.toast(message); 
            return
        }
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    onPressLearnMore(data){
        this.setState({
            isShowAlert:true
        })
    }
    _getData(){
        const _id = this.props.navigation.state.params.detail._id;
        const URL = `${REQUEST_URL}${_id}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data:{
                    ...responseData,
                    cover:{uri:'http://statics.zhuishushenqi.com' + responseData.cover},
                    updated:util.getTimeShow(responseData.updated),
                    wordCount:util.formatMoney(responseData.wordCount)
                },
                loading:false
            })
        })
        .catch(( err ) => {
            this.setState({
                loading:false
            })
        })
    }
    componentDidMount(){
        this._getData()
        this._atocData()
    }
    _atocData(){
        const _id = this.props.navigation.state.params.detail._id;
        const URL = `http://api.zhuishushenqi.com/atoc?view=summary&book=${_id}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                actions:responseData
            })
            
        })
        .catch(( err ) => {
            
        })
    }
    leftButton() {
        return {
            'text': '取消', onPress: () => {
                this.setState({
                    isShowAlert: false
                })
            },
            textStyle: {
                fontWeight: 'normal'
            }
        }
    }
    rightButton(){
        return  {
            'text': '确定', onPress: () => {
                this._storeData(this.state.data)
                this.setState({
                    isShowAlert: false
                })
            },
            textStyle: {
                fontWeight: 'normal'
            }
        }
    }
}


const styles = StyleSheet.create({
    containerIcon: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    head:{
        borderBottomColor:"#ddd",
        borderBottomWidth:0.5,
        height:170,
        paddingTop:10,
        paddingBottom:10
    },
    item:{
        flex: 1,
        flexDirection: 'row',
    },
    container:{
        paddingLeft:16,
        height:100,
        flex:1,
        justifyContent:'center',
    },
    wrapper:{
        flexDirection: 'row',
        marginTop:8
    },
    itemText:{
        marginRight:10,
        paddingRight:10,
        fontSize:14,
        height:14,
        lineHeight:16,
        paddingBottom:0,
        paddingTop:0,
        color:"red"
    },
    border:{
        borderRightColor:"red",
        borderRightWidth:1
    },
    btn:{
        justifyContent:"center",
        flexDirection: 'row'
    },
    button:{
        width:160,
        borderRadius:4,
        overflow:'hidden',
        marginRight:10
    },
    containerTitle:{
        justifyContent:"center",
        flexDirection: 'row',
        alignItems:'center',
        height:80,
        borderBottomColor:"#ddd",
        borderBottomWidth:0.5
    },
    itemTitle:{
        width:100
    },
    textAling:{
        lineHeight:30,
        textAlign:"center",
        color:"#666"
    },
    tag:{
        borderBottomColor:"#ddd",
        borderBottomWidth:0.5,
        paddingBottom:10,
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    text:{
        backgroundColor:"blue",
        color:'#fff',
        paddingBottom:4,
        paddingTop:4,
        paddingLeft:10,
        paddingRight:10,
        marginRight:10,
        borderRadius:3,
        marginTop:10
    }
    
});

export default Introduce;