const request = require('../util/request')
const cookie = require('../config/cookie')


/**
 * 飞猫云解析
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req,res) => {

    //请求头,需要到 ../config/cookie key[1] 设置cookie
    let header = {
        "cookie":cookie['1']
    }


    let url = req.body.url
    let code = url.slice(-8)
    let filename,filesize,fileid,durl,fmdown

    request.request('https://www.feimaoyun.com/index.php/down/detail','POST',"code="+code).then((result)=>{
        if(result.status == 0){
            res.send({
                code:-1,
                message:result.msg
            })
            return
        }

        filename = result.data.file_name
        filesize = result.data.file_size
        fileid = result.data.file_id


        request.request('https://www.feimaoyun.com/index.php/down/getsecurl','POST',"code="+code,header).then((result)=>{
            if(result.status == 0){
                res.send({
                    code:-1,
                    message:result.msg
                })
                return
            }


            fmdown = result.data.slice(-72)


            request.request('https://www.feimaoyun.com/index.php/down/getfileurl','POST','code='+ fmdown + '&geetest_challenge=70f3e436c20193f06913cc793962b6373m&geetest_validate=ba99bd99fc40c4b8fd37b20d85792a47&geetest_seccode=ba99bd99fc40c4b8fd37b20d85792a47%7Cjordan',header).then((result)=>{
                if(result.status == 0){
                    res.send({
                        code:-1,
                        message:result.msg
                    })
                    return
                }

                fmdown = result.data.slice(-72)


                request.request('https://www.feimaoyun.com/index.php/down/tdown','POST','code=' + fmdown + '&sc=1536*864&hd=0',header).then((result)=>{
                    if(result.status != 1){
                        res.send({
                            code:-1,
                            message:result.msg
                        })
                        return
                    }

                    res.send({
                        "code":0,
                        "fileid":fileid,
                        "filename":filename,
                        "filesize":filesize,
                        "durl":result.data.url,
                        "message":"解析成功"
                    })
                    return
                    
                })


                


            })



            
        })

        
    })
}