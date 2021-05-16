const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;

const getPlayerStyles = async (req, res) => {
    try {
        let result = {
            batsmenOption:appConstants.BATSMEN_OPTION,
            ballerOption:appConstants.BALLER_OPTION
        }
        let sr = new ServiceResponse(true, result);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

module.exports = {
    getPlayerStyles:getPlayerStyles
}