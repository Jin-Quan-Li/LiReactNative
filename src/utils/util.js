const formatTime = (date, format = 'YYYY-MM-DD hh:mm:ss') => {
    if (!date) return ''

    if(typeof date === 'string' && date.includes(' ')) {
        // 兼容苹果设备
        date = date.replace(' ', 'T') + '+08:00'
    }

    let d = new Date(date);
    let dates = null;

    dates = {
        'Y+': d.getFullYear(),
        'M+': d.getMonth() + 1,
        'D+': d.getDate(),
        'h+': d.getHours(),
        'm+': d.getMinutes(),
        's+': d.getSeconds()
    };

    for (const attr in dates) {
        const val = dates[attr] < 10 ? ('0' + dates[attr]) : dates[attr];
        const reg = new RegExp(attr, 'g');
        format = format.replace(reg, val);
    }

    return format;
}


export default {
    staticPath: 'http://statics.zhuishushenqi.com',
    getTimeShow(time_str){
        //debugger;
        var now = new Date(); //当前时间
        var getHours = now.getHours()  //小时
        var date = formatTime(time_str); //格式化 要显示的时间
        var bigNow = new Date(formatTime(now).replace(/-/g, '/')).getTime(); //转成时间戳
        var smallDate = new Date(date.replace(/-/g, '/')).getTime() //转成时间戳
        //计算时间间隔，单位为分钟
        var inter = parseInt((bigNow - smallDate) / 1000 / 60);
        if (inter === 0) {
            return "刚刚";
        }
        //多少分钟前
        else if (inter < 60) {
            return inter.toString() + "分钟前";
        }
        //多少小时前
        else if (inter < 60 * 24) {
            return parseInt(inter / 60).toString() + "小时前";
        }
        else if (inter < 60 * ( 24 + getHours + 1 ) ) {
            return '昨天'
        }
        else {
            return formatTime(time_str,'YYYY-MM-DD')
        }
    },
    formatMoney(money = 0, decimal = 2, type){
        if (money === '' || money === null || money === undefined || money * 1 === 0) return 0
        if (money < 1 && money > 0 && type !== 'separate') {
            return money.toFixed(decimal)
        }
    
        if (type === 'separate') {
            // 以逗号分隔
            return new Intl.NumberFormat().format(money)
        }
    
        const scale = [{
            value: 100000000,
            unit: '亿'
        }, {
            value: 10000,
            unit: '万'
        }, {
            value: 1,
            unit: ''
        }]
    
        for (let i = 0; i < scale.length; i++) {
            if (money * 1 >= scale[i].value) {
                return (money / scale[i].value).toFixed(decimal) + scale[i].unit
            }
        }
    
    },
    rgb(){//rgb颜色随机
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        var rgb = '('+r+','+g+','+b+',0.8)';
        return rgb;
    },
    formatTime
}