class ErrorExtender extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        statusCode=""+statusCode;
        this.status = `${statusCode.startsWith('4')? "client error":"server error"}`;
    }
}
module.exports = ErrorExtender;