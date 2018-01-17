董
师傅的妖孽人生API v0.1
赞美

接口概览
接口名称	功能

查询所有日历

更新一条日历

删除一条日历

创建一条日历


请求格式
POST/GET

返回格式
JSON格式

{
    "code": 200,
    "result": "success",
    "message": "查询成功",
    "data": [{
        "day": 4,
        "title": "在办公室发呆",
        "description": "%3Cdiv%3E123%3C%2Fdiv%3E"
    }]
}
公共返回参数说明
参数名	
code	200: 请求成功；




