const request = require('../util/request')
const str = require('../util/StrUtil')




/**
 * 蓝奏云解析
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req,res) => {

    let header = {
        
    }


    let url = req.body.url
    let pwd = req.body.pwd



    let filename,filesize,fileid,fn,zturl,pwdsign


    /**
     * 密码解析
     */
    if(pwd != '' || pwd != null){

        request.request(url,'GET').then(resp => {

            pwdsign = str.subStringMulti(resp,"&sign=","&").toString()
            
            filesize = str.subStringMulti(resp,'">大小：','</div>').toString()

            if(pwdsign == ''){
                res.send({
                    code:-1,
                    message:'sign,请检查文件是否存在.'
                })
                return
            }

            request.request("https://wwc.lanzoub.com/ajaxm.php","POST","action=downprocess&sign="+pwdsign+"&p="+pwd,{"referer":url}).then(resp => {

            if(resp.zt != 1){
                res.send({
                    code:-1,
                    message:resp.inf
                })
                return
            }
            filename = resp.inf
            zturl = resp.dom + '/file/' +  resp.url

            res.send({
                "code":0,
                "fileid":fileid,
                "filename":filename,
                "filesize":filesize,
                "durl":zturl,
                "message":"解析成功"
            })

            return
        })
        })


        return
        
    }




    /**
     * 无密码解析
     */

    request.request(url,'GET').then((result)=>{

        fn = str.subStringMulti(result,"/fn?","\"")[3].toString()

        if(fn == ''){
            res.send({
                code:-1,
                message:'无法获取fn,请检查文件是否存在或是否需要密码访问.'
            })
            return
        }


        filename = str.subStringMulti(result,"56px 0px 20px 0px;\">","</div>").toString()
        filesize = str.subStringMulti(result,'文件大小：</span>','<br>').toString()
        fileid = 'null'

        let sendurl = 'https://wwc.lanzoub.com/fn' + fn


        request.request(sendurl,'GET').then((result)=>{

            let ajaxdata = str.subStringMulti(result,'data = \'','\';').toString()
            let signkey =  str.subStringMulti(result,'websignkey = \'','\';').toString()
            let sign =  str.subStringMulti(result,'\'sign\':\'','\',').toString()

        

            if(ajaxdata == '' || signkey == '' || sign == ''){
                res.send({
                    code:-1,
                    message:'请检查文件是否存在或是否需要密码访问,若一切正常请到 https://www.ilzya.com/archives/4 提交更新'
                })
                return
            }



            request.request('https://wwc.lanzoub.com/ajaxm.php','POST','action=downprocess&signs='+ajaxdata+'&sign='+sign+'&ves=1&websign=&websignkey='+signkey,{"referer":sendurl}).then((result)=>{
                

                if(result.zt == 0){
                    res.send({
                        code:-1,
                        message:result.inf
                    })
                    return
                }

                zturl = result.dom + '/file/' +  result.url

                res.send({
                    "code":0,
                    "fileid":fileid,
                    "filename":filename,
                    "filesize":filesize,
                    "durl":zturl,
                    "message":"解析成功"
                })
                return
                    
                })  
        })

        
    })
}