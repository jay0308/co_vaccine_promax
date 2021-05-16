class GenericResponse{
    constructor(responseType,res,statusCode = 500){
        this.responseType = responseType;
        this.res = res;
        this.statusCode = statusCode
    }

    response(){
        let results = {
            results:{
                exception:false, 
            },
            message:""
        }
        if(this.responseType === "success" || this.responseType === true){
            results.results.statusCode = 200;
            results.results.body = this.res
        }else{
            results.results.exception = true;
            results.statusCode = this.statusCode;
            results.message = this.res
        }
        return results;
    }
}

module.exports = {
    GenericResponse:GenericResponse
}