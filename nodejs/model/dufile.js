const request = require('../util/request')
const str = require('../util/StrUtil')


/**
 * dufile解析
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req,res) => {

    let header = {
        "user-agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36",
        "referer":req.body.url,
        "cookie":"UM_distinctid=17cc97574669e0-045f6d04827332-57b193e-144000-17cc9757467d82; __gads=ID=36a46bfbec24e231-22562bb0f2cc006d:T=1635516326:RT=1635516326:S=ALNI_Mav4HbndsCv5Y_nEzlrJpBiiDL4Cw; CNZZDATA2710406=cnzz_eid%3D1836248859-1635463650-%26ntime%3D1645776825; PHPSESSID=aeg4hsg5qf52fatfbh27mq5og5; PU=sas00"
    }

    let url = req.body.url
    
    let filename,filesize,fileid,durl,fmdown

    request.request(url,'GET','',header).then((result)=>{
        filename = str.subStringMulti(result,"文件下载&nbsp;&nbsp;","</h2>").toString()
        filesize = str.subStringMulti(result,'文件大小：<b>','</b>').toString()
        fileid = str.subStringMulti(result,'<a id="downpage_link" href="/down/',".html").toString()
        if(fileid == ''){
            res.send({
                code:-1,
                message:"未解析出文件id"
            })
            return
        }
        request.request('http://dufile.com/dd.php?file_key='+fileid+'&p=1','POST','',header).then((result)=>{
            console.log(result)
            durl = str.subStringMulti(result,'"login_ok"><a id="downs" href="','\"').toString()
            if(durl == ''){
                res.send({
                    code:-1,
                    message:"未解析出durl"
                })
                return
            }
            res.send({
                "code":0,
                "fileid":fileid,
                "filename":filename,
                "filesize":filesize,
                "durl":durl,
                "message":"解析成功"
            })
            return
            
        })


    })


}