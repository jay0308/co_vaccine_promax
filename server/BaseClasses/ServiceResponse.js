class ServiceResponse{
    constructor(status,res){
        this.status = status;
        this.res = res;
    }

    getServiceResponse(){
        return {
            status:this.status,
            res:this.res
        }
    }
}

module.exports ={
    serviceResponse:ServiceResponse
} 