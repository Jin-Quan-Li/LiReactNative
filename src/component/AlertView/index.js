import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Modal
} from 'react-native';

let {width, height} = Dimensions.get("window");

export default class AlertView extends Component {

    static propTypes = {
        isShow: PropTypes.bool.isRequired, //控制视图是否显示，必需
        title: PropTypes.string,           //标题,可选
        message: PropTypes.string,         //文本内容，可选
        rightButton: PropTypes.object,     //底部右边按钮
        leftButton: PropTypes.object       //底部右边按钮
    }

    //蒙层背景
    renderMongoliaView() {
        return (
            <View style={styles.bgContainViewStyle}/>
        );
    }

    // 标题
    renderTitle() {
        return (
            <View style={styles.titleContainerStyle}>
                <Text style={styles.titleStyle}>{this.props.title}</Text></View>
        )
    }

    // 详情
    renderMessage() {
        return (
            <View style={styles.contentContainerStyle}>
                <Text style={styles.contentStyle}>{this.props.message}</Text></View>
        )
    }

    // 按钮
    renderBottomBtns() {
        let {leftButton, rightButton} = this.props

        let leftBtnText = leftButton && leftButton.text,
            leftBtnTextStyle = leftButton && leftButton.textStyle,
            leftBtnAction = leftButton && leftButton.onPress;

        let rightBtnText = rightButton && rightButton.text,
            rightBtnTextStyle = rightButton && rightButton.textStyle,
            rightBtnAction = rightButton && rightButton.onPress;

        if (leftBtnText && leftBtnText.length && rightBtnText && rightBtnText.length) {
            return (
                <View style={styles.btnContainerStyle}>
                    <TouchableOpacity onPress={() => {
                        leftBtnAction && leftBtnAction()
                    }}
                                      style={styles.btnStyle}>
                        <Text style={[{
                            fontSize: 16,
                            color: '#3981FD',
                            fontWeight: 'bold'
                        }, leftBtnTextStyle]}>{leftBtnText}</Text>
                    </TouchableOpacity>
                    <View style={styles.verticalLineStyle}/>
                    <TouchableOpacity onPress={() => {
                        rightBtnAction && rightBtnAction()
                    }}
                                      style={styles.btnStyle}>
                        <Text style={[{fontSize: 16, color: '#3981FD'}, rightBtnTextStyle]}>{rightBtnText}</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            let text = leftBtnText;
            let click = leftBtnAction;
            let textStyle = leftBtnTextStyle

            if (rightBtnText && rightBtnText.length) {
                text = rightBtnText
                click = rightBtnAction
                textStyle = rightBtnTextStyle
            }
            if (!text || text.length === 0) {
                text = '确定'
            }
            return (
                <View style={styles.btnContainerStyle}>
                    <TouchableOpacity onPress={() => {
                        click && click()
                    }}
                                      style={styles.btnStyle}>
                        <Text style={[{fontSize: 16, color: '#157efb', fontWeight: 'bold'}, textStyle]}>{text}</Text>
                    </TouchableOpacity>

                </View>
            )
        }
    }

    // 绘制Alert视图
    renderAlertView() {
        let {title, message} = this.props
        return (
            <View style={styles.containerStyle}>
                <View style={[styles.alertViewStyle]}>
                    <ScrollView style={{marginTop: 20, marginBottom: 20}}>
                        {
                            (title && title.length)
                                ?
                                this.renderTitle()
                                :
                                null
                        }
                        {
                            (message && message.length)
                                ?
                                this.renderMessage()
                                :
                                null
                        }
                    </ScrollView>
                    <View style={styles.horizontalLineStyle}/>
                    {this.renderBottomBtns()}
                </View>
            </View>
        );
    }

    render() {
        if (!this.props.isShow) {
            return null;
        }
        return (
            <Modal transparent={true} onRequestClose={() => {
            }}>
                {
                    this.renderMongoliaView()
                }
                {
                    this.renderAlertView()
                }
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        bottom: 0,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    },
    bgContainViewStyle: {
        top: 0,
        width: width,
        position: 'absolute',
        opacity: 0.4,
        backgroundColor: 'rgb(0,0,0)',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertViewStyle: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 50,
        marginRight: 50,
        position: 'absolute',
        maxHeight: height - 40
    },
    titleContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    titleStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333'
    },
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentStyle: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        fontSize: 14,
        textAlign: 'center',
        color: '#666666',
    },
    horizontalLineStyle: {
        height: 0.5,
        backgroundColor: 'lightgrey'
    },
    btnContainerStyle: {
        flexDirection: 'row',
        width: width - 100,
        height: 48
    },
    verticalLineStyle: {
        height: 48,
        backgroundColor: 'lightgrey',
        width: 0.5
    },
    btnStyle: {
        flex: 1,
        height: 47,
        justifyContent: 'center',
        alignItems: 'center'
    },

});
