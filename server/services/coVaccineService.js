const dbVars = require("../loaders/dbInitializer").dbVars;
const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const utility = require("../utils/utility");
const _Date = utility.momentDate();
const { ObjectId } = require('mongodb');
const redisClient = require("../loaders/redisInitializer");

const userScope = async (req, res) => {
    try {

        let validateFields = [
            {
                fieldName: "scope",
                value: req.body.scope,
                validate: ["notNull"]
            },
            {
                fieldName: "ids",
                value: req.body.ids,
                validate: ["isArray"]
            },
            {
                fieldName: "dose",
                value: req.body.dose,
                validate: ["notNull"]
            },
            {
                fieldName: "contactNo",
                value: req.body.contactNo,
                validate: ["notNull"]
            },
            {
                fieldName: "age",
                value: req.body.age,
                validate: ["notNull"]
            }
        ]
        if (!utility.validateFields(validateFields)) {
            let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
            return sr.getServiceResponse();
        }
        let userList_redis = await redisClient.get("coVaccine_userList");
        console.log("userList_redis",userList_redis)
        let redis_res = userList_redis ? await redisClient.set("coVaccine_userList",[...userList_redis,req.body])  : await redisClient.set("coVaccine_userList",[])
        let sr = new ServiceResponse(true, redis_res);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

module.exports = {
    userScope: userScope,
}