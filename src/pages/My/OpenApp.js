import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
	StyleSheet,
	View,
    Text,
    Button,
    Linking
} from 'react-native';
import WebView from 'react-native-webview';

class OpenApp extends Component {
    static navigationOptions = ({ navigation }) =>({
        headerTitle:'唤醒APP',
        gestureEnabled:true
    })
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={() => { this.onPressLearnMore('mqq://') }}
                        title="QQ"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={() => { this.onPressLearnMore('weixin://') }}
                        title="微信"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={() =>{ this.onPressLearnMore('weibo://') }}
                        title="新浪微博"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={() => { this.onPressLearnMore('tencentweibo://') }}
                        title="腾讯微博"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={() => { this.onPressLearnMore('taobao://') }}
                        title="淘宝"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={ () => this.onPressLearnMore('alipay://') }
                        title="支付宝"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={ () => this.onPressLearnMore('imeituan://') }
                        title="美团"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={() => this.onPressLearnMore('zhihu://')}
                        title="知乎"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={() => this.onPressLearnMore('youku://')}
                        title="优酷"
                        color="blue"
                    />
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <Button
                        onPress={() => this.onPressLearnMore('https://www.baidu.com/')}
                        title="打开链接"
                        color="blue"
                    />
                </View>
            </View>
        );
    }
    onPressLearnMore(app){
        // QQ: mqq:// 
        // 微信: weixin:// 
        // 新浪微博: weibo:// (sinaweibo://) 
        // 腾讯微博: tencentweibo:// 
        // 淘宝: taobao:// 
        // 支付宝: alipay:// 
        // 美团: imeituan:// 
        // 知乎: zhihu:// 
        // 优酷: youku://
        // 2、跳转代码a
        Linking.canOpenURL(app).then(supported => {
            if (supported) {
                Linking.openURL(app);
            } else {
                alert('检测到您未安装此应用')
            }
        });
    }
}

export default OpenApp;