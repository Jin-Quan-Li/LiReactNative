import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
class Bookcontent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpContent:'',
            data:{}
        }
    }
    render() { 
        this._getData()
        return (  
            <View>
                <Text style={styles.title}>{this.state.data.title}</Text>
                <FlatList
                    style={{height:'88%'}}
                    data={[{
                        key:this.state.cpContent
                    }]}
                    renderItem={({item,index}) => 
                        <Text style={styles.cpContent}>{item.key}</Text>
                    }
                />
                <View style={styles.container}>
                    <View style={styles.chapter}>
                        <TouchableOpacity onPress={() => this._onPress()}>
                            <Text style={styles.chapterText}>上一章</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chapter}>
                        <TouchableOpacity onPress={() => this._onPress()}>
                            <Text style={styles.chapterText}>目录</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chapter}>
                        <TouchableOpacity onPress={() => this._onPress()}>
                            <Text style={styles.chapterText}>下一章</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    componentDidMount(){
    }
    _getData(){
        const link = this.props.navigation.state.params.detail.link;
        const URL = `http://chapterup.zhuishushenqi.com/chapter/${link}`;
        fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                cpContent:responseData.chapter.cpContent,
                data:responseData.chapter
            })
        })
        .catch(( err ) => {
            console.log(err)
        })
    }
    _onPress(){
        this._Drawer()
    }
    _Drawer(){
        this.props.navigation.toggleDrawer()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    cpContent:{
        lineHeight:30,
        padding:14
    },
    chapter:{
        margin:8
    },
    chapterText:{
        width:100,
        height:30,
        lineHeight:30,
        textAlign:'center',
        borderRadius:4,
        backgroundColor:"green",
        color:"#fff"
    },
    title:{
        color:"#000",
        textAlign:"center",
        fontWeight:'bold',
        fontSize:20,
        lineHeight:40
    }
})

export default Bookcontent