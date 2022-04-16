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
     * 检测data数据
     */
    function checkenJson($type){
        $jsonStr = json_decode($type,true);
        if($jsonStr['link'] == ''){
            return false;
        }
        return true;
    }

    /**
     * 获取错误信息
     * 如果检测data数据返回假那么执行该方法
     */
    function getError($type){
        $jsonStr = json_decode($type,true);
        if($jsonStr['link'] == ''){
            echo '{"message":"请输入文件地址","success":"false"}';
            return false;
        }else{
            return true;
        }
    }




    $data = file_get_contents('php://input'); //接收参数



    $aaaaaa = getError($data);
    if($aaaaaa == false){
        return;
    }


    /**
     * 用于统计,若没特定需要请保留
     */
    function resetJSON($type,$s){
        $tempArray = json_decode($type,true);
        $jsonData = array();
        $jsonData['domain'] = $s;
        $jsonData['type'] = 'json';
    
        if($type!=''){
            $tempArray = array_merge($tempArray, $jsonData);
            $jsonData_merged = json_encode($tempArray);
        }else{
            $jsonData_merged = json_encode($jsonData);
        }
        
        

        return $jsonData_merged;
    }



    //访问后端服务器
    $result = request_by_curl('http://api.ilzya.com:1306/resolve',resetJSON($data,$serverUrl));

    echo $result;
    

?>
