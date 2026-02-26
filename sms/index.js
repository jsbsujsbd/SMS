const {client}=require('../redis_db/index');
exports.build_smscode=async(req,res)=>{
    try{
    const code=Math.floor(Math.random()*9000)+1000;
    console.log(req.query.phone, 'SMS code:', code.toString());
    await client.setex(`smscode:${req.query.phone}`, 60,code);
    req.app.get('wss').clients.forEach((wsclient)=>{
        if(wsclient.readyState===1){
            wsclient.send('您的短信验证码为：' + code+',有效期为60秒');
        }   
    });
    res.send({
        status: 200,
        message: '您的验证码为：'+code+',有效期为60秒',
        data: code
    })
    }catch(err){
        console.error('Error building SMS code:', err); 
        res.status(500).send({
            status: 500,
            message: '服务器错误',
            data: null
        });
        return;
    }

};




exports.check_smscode=async(req,res)=>{
    const {code}=req.body;
    console.log(code)
    try{
         let value=await client.get(`smscode:${req.body.phone}`)
         console.log('client 类型:', typeof client);
         console.log('client 构造函数:', client.constructor.name);
         console.log('client.get 类型:', typeof client.get);
        if(Number(value)===code){
            req.session.user = { phone: req.body.phone };
            res.send({
                status: 200,
                message: '验证码正确',
                data: null
            })
        }   
        else{
            res.send({
                status: 400,
                message: '验证码错误',
                data: null
            })
        }
    }catch(err){
     console.error('完整错误:', err);
     console.error('command:', err.command);
    }


    
}
