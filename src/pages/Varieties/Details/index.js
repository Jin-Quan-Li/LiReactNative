import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';

const REQUEST_URL = 'https://api.zhuishushenqi.com/book/by-categories';
const staticPath = 'http://statics.zhuishushenqi.com';
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            refreshing:false,
            start:0,
            totalPage:1,
            type:[{
                name:"热门",
                key:"hot"
            },
            {
                name:"新书",
                key:"new"
            },
            {
                name:"好评",
                key:"repulation"
            },
            {
                name:"完结",
                key:"over"
            },
            {
                name:"包月",
                key:"month"
            }],
            key:'hot',
            showFoot:0
        }
        this._onRefresh = this._onRefresh.bind(this);
        this._getData = this._getData.bind(this);
        this.haneldType = this.haneldType.bind(this);
    }
    
    static navigationOptions = ({ navigation }) =>({
        headerTitle:navigation.state.params.detail.name,
        gestureEnabled:true
    });
    render() { 
        return ( 
            <View style={{backgroundColor:"#fff"}}>
                <View style={styles.type}>
                    {
                        this.state.type.map((item,index) => {
                            return <TouchableOpacity key={index} onPress={() => { this.haneldType(item.key) }}>
                                    <Text style={styles.typeText}>{item.name}</Text>
                                </TouchableOpacity>
                        })
                    }
                </View>
                <FlatList
                    style={{height:'94%'}}
                    data={this.state.books}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}
                    renderItem={({item,index}) => 
                        <TouchableOpacity style={styles.container} onPress={() => { this._onPressButton(item) }}>
                            <View>
                                <Image source={ item.cover } style={{width: 80, height: 100}}  />
                            </View>
                            <View style={{flex:1,marginLeft:10,height: 100,paddingTop:6}}>
                                <Text style={{fontWeight:'bold'}}>{item.title}</Text>
                                <Text style={styles.item}>{item.author}</Text>
                                <Text numberOfLines={1} style={styles.item}>{item.lastChapter}</Text>
                                <Text style={styles.item}>{item.latelyFollower}阅读，{item.retentionRatio}%读者留存</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
    haneldType(key){
        this.setState({
            books:[],
            start:0,
            totalPage:1,
            key
        },() => {
            this._getData(key) 
        })
    }
    _onPressButton(item){
        this.props.navigation.navigate('Introduce', {detail: item})
    }
    _onRefresh(){
        this.haneldType('')
    }
    _getData(type = this.state.type[0].key){
        this.setState({
            refreshing:true
        })
        const { gender, name } = this.props.navigation.state.params.detail;
        const URL = `${REQUEST_URL}?gender=${gender}&type=${type}&major=${name}&minor=&start=${this.state.start}&limit=10`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            const totalPage = Math.ceil(responseData.total / 10);
            let foot = 0;
            if(this.state.start >= totalPage - 1){
                foot = 1;//listView底部显示没有更多数据了
            }
            this.setState({
                books:[...this.state.books,...responseData.books.map((item,index) => {
                    item.cover = {uri:'http://statics.zhuishushenqi.com' + item.cover},
                    item.key = item._id + index + (+new Date())
                    return item
                })],
                refreshing:false,
                start:this.state.start + 1,
                totalPage,
                showFoot:foot
            })
        })
        .catch(( err ) => {
            this.setState({
                refreshing:false
            })
        })
    }
    _getType(){
        const URL = `http://api.zhuishushenqi.com/cats/lv2`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {

        })
        .catch(( err ) => {
            this.setState({
                refreshing:false
            })
        })
    }
    componentDidMount(){
        this._getType()
        this._getData()
    }
    //渲染FlatList 底部显示
    _renderFooter=()=>{
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={{flexDirection:'row',
                    height:24,
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:10}}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={{ flexDirection:'row',
                    height:24,
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:10}}/>

            );
        }
    }
    //上拉加载时触发
    _onEndReached=()=>{
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot !== 0 ){
            return ;
        }
        // //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if( (this.state.start !== 0 ) && (this.state.start >= this.state.totalPage ) ){
            return;
        }
        //底部显示正在加载更多数据
        this.setState({
            showFoot:2
        });
        //获取数据，在componentDidMount()已经请求过数据了
        if (this.state.start > 0){
            this._getData(this.state.key)
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#ddd'
    },
    item:{
        lineHeight:26
    },
    type:{
        height:45,
        borderBottomColor:"#ddd",
        borderBottomWidth:0.5,
        flexDirection: 'row',
        flexWrap:'wrap',
        paddingLeft:10
    },
    typeText:{
        lineHeight:45,
        marginRight:16,
        fontSize:14
    }

});

export default Details;