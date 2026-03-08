
class ST{
    phone="";
    code="";
    timestamp=0;
    constructor(phone,code){
        this.phone=phone;
        this.code=code;
        this.timestamp=Date.now();
    }
}
module.exports = {ST};