const request = require('../util/request')
const str = require('../util/StrUtil')


/**
 * 567yunpan解析
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req,res) => {

    let header = {
        "user-agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36",
        "referer":req.body.url
    }

    let url = req.body.url
    
    let filename,filesize,fileid,durl,fmdown

    request.request(url,'GET','',header).then((result)=>{
        filename = str.subStringMulti(result,"<h1>","<h1>").toString()
        filesize = str.subStringMulti(result,'文件大小：','，').toString()
        fileid = str.subStringMulti(result,"down2-",".html").toString()
        console.log(fileid)
        if(fileid == ''){
            res.send({
                code:-1,
                message:"未解析出文件id"
            })
            return
        }
        request.request('https://www.567yunpan.com/ajax.php','POST','action=load_down_addr10&file_id='+fileid,header).then((result)=>{
            durl = str.subStringMulti(result,'</span></a><a href=\"','\"').toString()
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