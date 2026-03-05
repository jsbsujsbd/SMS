const pool=require('../../database/mysql_db/index');
exports.send_img=async(req,res)=>{
    try{
        const [rows]=await pool.promise().query('SELECT * FROM img');
        console.log(rows)
        res.send({
            status: 200,
            message: '图片数据获取成功',
            data: rows
        })
    }
    catch(err){
        console.error('Error fetching image data:', err);
        res.status(500).send({
            status: 500,
            message: '服务器错误',
            data: null

        });
    }
}
