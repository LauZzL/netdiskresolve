<?php
 
    //获取请求url
    $serverUrl = $_SERVER["REQUEST_SCHEME"].'://'.$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];

    function request_by_curl($remote_server, $post_string) { //curl
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $remote_server);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$post_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }



    /**
     * 获取错误信息
     * 如果检测data数据返回假那么执行该方法
     */
    function getError($type){
        $jsonStr = json_decode($type,true);
        if($jsonStr['url'] == ''){
         //fix bug1
            echo '{"message":"请输入文件地址","code":-1}';
            return false;
        }else{
            return true;
        }
    }




    $data = file_get_contents('php://input'); //接收参数

    $jsonStr = json_decode($data,true);
    $sendData = "url=" . $jsonStr['url'];


    $aaaaaa = getError($data);
    if($aaaaaa == false){
        return;
    }




    //访问后端服务器
    $result = request_by_curl('http://api.ilzya.com:1306/resolve',$sendData);

    echo $result;
    

?>
