const express=require('express');
const img_router=express.Router();
const send_img=require('../../control/img/index');
img_router.get('/send_img', send_img.send_img);
module.exports=img_router;