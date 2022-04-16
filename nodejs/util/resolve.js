//加载wpjson
const wpjson = require('../config/wp')
const server = require('../config/server')


const feimaoyun = require('../model/feimaoyun')
const _77file = require('../model/77file')
const xunniu = require('../model/xunniu')
const _567 = require('../model/567pan')
const dufile = require('../model/dufile')
const expfile = require('../model/expfile')
const xueqiuyun = require('../model/xueqiuyun')
const xfpan = require('../model/xfpan')
const ownfile = require('../model/ownfile')
const dudujb = require('../model/dudujb')
const yifile = require('../model/yifile')
const _1988wp = require('../model/1988wp')
const rosefile = require('../model/rosefile')
const xingyaoyun = require('../model/xingyaoyun')
const kufile = require('../model/kufile')


module.exports = (req,res) =>{
    if(server['log-server']==true)
        console.log("接收解析数据 => "+ req.body.url)
    if(server['isrun']==false){
        res.send({
            code:-1,
            message:server['norunmessage']
        })
        return
    }else{
        let urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        let domain=urlReg.exec(req.body.url);
        switch(wpjson[domain[0]]){
            case 0:
                feimaoyun(req,res)
            break;
            case 1:
                _77file(req,res)
            break;
            case 2:
                xunniu(req,res)
            break;
            case 3:
                _567(req,res)
            break;
            case 4:
                dufile(req,res)
            break;
            case 5:
                expfile(req,res)
            break;
            case 6:
                xueqiuyun(req,res)
            break;
            case 7:
                xfpan(req,res)
            break;
            case 8:
                ownfile(req,res)
            break;
            case 9:
                dudujb(req,res)
            break;
            case 10:
                yifile(req,res)
            break;
            case 11:
                _1988wp(req,res)
            break;
            case 12:
                rosefile(req,res)
            break;
            case 13:
                xingyaoyun(req,res)
            break;
            case 14:
                kufile(req,res)
            break;



            default:
                res.send({
                    code:-1,
                    message:"未识别出所属网盘,如果文档中有收录,请查看域名是否匹配"
                })
            break;
        }
    }
}
