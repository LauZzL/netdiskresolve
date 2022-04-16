/**
 * blog:https://www.ilzya.com
 * author:lzyAB
 * update:2022-4-16
 */


const server = require('./config/server')

const port = server['port'] //端口

//引入express模块
const express = require('express')




const resolve = require('./util/resolve')
const version = require('./util/version')
const connect = require('./util/connect')


var bodyParser = require("body-parser");  

//创建app对象
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//该地址是用来NetDiskResolve PC端下载工具使用
app.post('/connect', connect)

app.post('/resolve', resolve)

//该地址是用来NetDiskResolve PC端下载工具使用
app.post('/version', version)


//4.启动服务监听端口
app.listen(port,()=>{
    console.log("run port:" + port)
})