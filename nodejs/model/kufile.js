const request = require('../util/request')
const str = require('../util/StrUtil')


/**
 * kufile解析
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
        filename = str.subStringMulti(result,'<div class="file_name">','</div>').toString()
        filesize = str.subStringMulti(result,'<li>文件大小：','</li>').toString()
        fileid = str.subStringMulti(result,"\nadd_ref(","\);\n").toString().replace("(","").replace(")","")
        if(fileid == ''){
            res.send({
                code:-1,
                message:"未解析出文件id"
            })
            return
        }
        request.request('http://www.kufile.net/ajax.php','POST','action=load_down_file_user&file_id='+fileid+"&ms=undefined*undefined&sc=1536*864",header).then((result)=>{
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
                "durl":"http://www.kufile.net/"+durl,
                "message":"解析成功"
            })
            return
            
        })


    })


}