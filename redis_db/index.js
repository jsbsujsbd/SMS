const redis=require('ioredis')
const RedisStore = require('connect-redis')(require('express-session'));
const client=new redis({
    port: 6379,
    host: '192.168.88.130',
    password:'123456',
    db: 0
}) 
console.log('创建 client 后:', client.constructor.name);
const redis_store=new RedisStore({client: client,prefix: "sess:",});
console.log('创建 store 后:', client.constructor.name);
module.exports={client,redis_store};