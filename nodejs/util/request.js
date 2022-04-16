const axios = require('axios')


module.exports = {
    request:function(url,method,data,header){
        return new Promise((resolve, reject) => {
            if(method === 'GET'){
                axios.get(url).then((response) => {
                    resolve(response.data);
                }).catch((err) => {
                    reject(err);
                });
            }else if(method === 'POST'){
                axios.post(url,data,{headers:header}).then((response) => {
                    resolve(response.data);
                })
            }

        })

    }
}