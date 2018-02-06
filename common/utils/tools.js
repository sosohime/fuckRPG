import {
    isPlainObject
} from 'lodash';
import * as MD5 from 'js-md5';

function encodeSearchParams(obj = {}) {
    const params = []

    Object.keys(obj).forEach((key) => {
        let value = obj[key]
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
            value = ''
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='))
    })

    return params.join('&')
}

export function path(url, obj) {
    let params = encodeSearchParams(obj);
    return `${url}?${params}`
}

export function strToMD5UpperCase(str) {
    let md5UpperCase = MD5.default(str).toUpperCase();
    return md5UpperCase;
}

export function datePattern (date , fmt) {
    let thisDate = new Date(date.replace(/-/g, '/'))
    let o = {
    "M+" : thisDate.getMonth() + 1, //月份
    "d+" : thisDate.getDate(), //日
    "h+" : thisDate.getHours() % 12 == 0 ? 12 : thisDate.getHours() % 12, //小时
    "H+" : thisDate.getHours(), //小时
    "m+" : thisDate.getMinutes(), //分
    "s+" : thisDate.getSeconds(), //秒
    "q+" : Math.floor((thisDate.getMonth()+3)/3), //季度
    "S" : thisDate.getMilliseconds() //毫秒
    };
    let week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (thisDate.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[thisDate.getDay()+""]);
    }
    for(let k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

export function getUrlFromString(str) {  
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;  
    //var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;  
    //var reg=/(http(s)?\:\/\/)?(www\.)?(\w+\:\d+)?(\/\w+)+\.(swf|gif|jpg|bmp|jpeg)/gi;  
    //var reg=/(http(s)?\:\/\/)?(www\.)?(\w+\:\d+)?(\/\w+)+\.(swf|gif|jpg|bmp|jpeg)/gi;  
    var reg= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;  
    //var reg= /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;  
    //v = v.replace(reg, "<a href='$1$2'>$1$2</a>"); //这里的reg就是上面的正则表达式  
    //s = s.replace(reg, "$1$2"); //这里的reg就是上面的正则表达式  
    str = str.match(reg);  
    return (str)  
}  