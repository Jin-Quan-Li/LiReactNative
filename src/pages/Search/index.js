import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
	StyleSheet,
	View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text:'',
            keywords:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }
    static navigationOptions = {
        title: '搜索',
        tabBarIcon:({tintColor}) => {
            return <AntDesign name="search1" color={tintColor} size={24} />
        }
    }
    render() { 
        return ( 
            <View>
                <View style={styles.search}>
                    <View style={{width:'90%',position:'relative'}}>
                        <TextInput
                            style={styles.Input}
                            placeholder="输入小说名称！"
                            onChangeText={(text) => this.handleChange(text)}
                            value={this.state.text}
                        />
                        <AntDesign style={styles.icon} name="search1" color={"#ddd"} size={20} />
                    </View>
                </View>
                <FlatList
                    data={this.state.keywords}
                    renderItem={({item,index}) => 
                        <TouchableOpacity onPress={() => { this._onPressButton(item) }} key={index}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
    _onPressButton(item){
        this.props.navigation.navigate('Introduce', {detail: item})
    }
    handleChange(text){
        this.setState({
            text
        },() => {
            this._getData()
        })
    }
    _getData(){
        const URL = `http://api.zhuishushenqi.com/book/fuzzy-search?query=${this.state.text}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                keywords:responseData.books
            })
        })
        .catch(( err ) => {
            
        })
    }
}

const styles = StyleSheet.create({
    search:{
        backgroundColor:'blue',
        height:50,
        alignItems:'center',
        justifyContent:'center'
    },
    Input:{
        height:40,
        width:'100%',
        fontSize:13,
        paddingLeft:30,
        backgroundColor:"#fff",
        borderRadius:4
    },
    itemText:{
        height:44,
        lineHeight:44,
        paddingLeft:16,
        borderBottomColor:"#ddd",
        borderBottomWidth:1
    },
    icon:{
        position:'absolute',
        top:10,
        left:6
    }
})

export default Search;