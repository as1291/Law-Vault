var errors = require("./error");
var constants  = require("./constants")


module.exports = {
    sendError: function(res,msg,status_code=500){
       
        
        status_code=String(status_code);
        console.trace(errors[status_code]);

        res.status(status_code).json({
            code: status_code,
            message:  msg?msg:"Contact adminstator",
            success:false,
            time: Date.now()
        });
        return;
    },

    sendSuccess: function(res,data){
        res.status(constants.OK).json({
            sucess:true,
            data:data,
            time: Date.now()
        });

    }
};