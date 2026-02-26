const session=require('express-session');
const {redis_store}=require('../redis_db/index');
const sessionMiddleware=session({
    store: redis_store,
    secret: 'my_secret_key_123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24,httpOnly:true },
});
module.exports=sessionMiddleware;