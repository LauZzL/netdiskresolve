const request = require('../util/request')
const str = require('../util/StrUtil')


/**
 * rosefile解析
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
        filename = str.subStringMulti(result,"            <h3>","</h3>").toString()
        filesize = str.subStringMulti(result,'            <span class="h4">','</span>').toString()
        fileid = str.subStringMulti(result,"// is open ref count\nadd_ref(",");").toString().replace("(","").replace(")","")
        if(fileid == ''){
            res.send({
                code:-1,
                message:"未解析出文件id"
            })
            return
        }
        request.request('https://rosefile.net/ajax.php','POST','action=load_down_addr1&file_id='+fileid,header).then((result)=>{
            durl = str.subStringMulti(result,'<a href=\"','\"').toString()
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