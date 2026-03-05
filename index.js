const express=require('express');
const websocket=require('ws');
const router=require('./interface/sms_interface/index');
const img_router=require('./interface/img_interface/index');
const sessionMiddleware=require('./session/index');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(sessionMiddleware)
app.use('/img', img_router);
app.use('/api', router);
const server = require('http').createServer(app);
const wss=new websocket.Server({server});
app.set('wss', wss);
wss.on('connection', (ws)=>{
    console.log('WebSocket connection established');
    ws.on('message', (message)=>{
       console.log('111')
        const msg = message.toString();  
        console.log('Received message:', msg);
        // ws.send('Message received: ' + message);
        ws.send('服务器已收到消息: ' + msg);
    });s
   
    ws.on('close', ()=>{
        console.log('WebSocket connection closed');
    });
});
server.listen(9092, ()=>{
    console.log('Server is running on port 9092');
})