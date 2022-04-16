const request = require('../util/request')
const str = require('../util/StrUtil')
const cookie = require('../config/cookie')


/**
 * yifile解析
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req,res) => {

    let header = {
        "user-agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36",
        "referer":req.body.url,
        "cookie":cookie[10]
    }

    let url = req.body.url
    
    let filename,filesize,fileid,durl,fmdown

    request.request(url,'GET','',header).then((result)=>{
        filename = str.subStringMulti(result,'title="bd_logo1_31bdc765.png">',"</span></b></li>").toString()
        filesize = str.subStringMulti(result,'d="FileSize">','</span></li>').toString()
        fileid = str.subStringMulti(result,"data : 'file_id=","'").toString()
        console.log(fileid)
        if(fileid == ''){
            res.send({
                code:-1,
                message:"未解析出文件id"
            })
            return
        }
        request.request('https://www.yifile.com/ajax.php','POST','action=yifile_down&file_id='+fileid+"&verycode=jm7j",header).then((result)=>{
            console.log(result)
            durl = result.replace("true|","")
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