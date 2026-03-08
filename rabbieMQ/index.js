const amqp = require('amqplib');
const queueName = 'sms_task_queue';
let cn = null;
exports.initMQ=async(wss)=>{
    try{
         const coon=await amqp.connect('amqp://myuser:mypassword@192.168.88.130:5672')
         cn=await coon.createChannel()
         await cn.assertQueue(queueName,{ durable: true })
         cn.prefetch(1);
         cn.consume(queueName, (msg)=>{
            if(msg!==null){
             const team_data=JSON.parse(msg.content.toString())
             console.log('拿到数据:', team_data);
             wss.clients.forEach((wsclient)=>{
             if(wsclient.readyState===1){
             wsclient.send('消息队列的数据' + team_data.code);
        }   
    });
            }

            cn.ack(msg);
         })
          console.log('等待数据...');
    }catch(err){
        console.error('Failed to connect to RabbitMQ:', err);
    }
}

exports.send_message_team=async(ST)=>{
        try{
           cn.sendToQueue(queueName, Buffer.from(JSON.stringify(ST)), { persistent: true });
        }catch(mqErr){
            console.log(mqErr)
        }
        
    }