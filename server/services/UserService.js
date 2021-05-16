const dbVars = require("../loaders/dbInitializer").dbVars;
const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const EmailService = require("./EmailService");
const SmsService = require("./SMSService");
const utility = require("../utils/utility");
const _Date = utility.momentDate();
const { ObjectId } = require('mongodb');

const getUserList = async (req, res) => {
    try {
        const mongoDb = dbVars.db;
        let query = req.query.name;
        var re = new RegExp(query, "g");
        let result = query ? await mongoDb.collection("users").find({ "name": re }, { _id: 1, name: 1, contactNo: 1 }).toArray() : await mongoDb.collection("users").find({}, { _id: 1, name: 1, contactNo: 1 }).toArray();

        let sr = new ServiceResponse(true, result);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const getDefaultUser = async (req, res) => {

    try {
        let token = req.headers['x-access-token'] || req.headers['auth'];
        const mongoDb = dbVars.db;
        if (token) {
            let result = await mongoDb.collection("users").find({ paymentBalance: { $gt: 0 } }, { 'fields': { _id: 1, name: 1, contactNo: 1, paymentBalance: 1 } }).toArray();

            let sr = new ServiceResponse(true, result);
            return sr.getServiceResponse();
        } else {
            let sr = new ServiceResponse(false, appConstants.TOKEN_MISSING);
            return sr.getServiceResponse();
        }

    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}
const getMyInfo = async (req, res) => {

    try {
        let token = req.headers['x-access-token'] || req.headers['auth'];
        const mongoDb = dbVars.db;
        if (token) {
            let result = await mongoDb.collection("users").find({ token: token }).toArray();
            if (result && result.length > 0) {
                let sr = new ServiceResponse(true, result[0]);
                return sr.getServiceResponse();
            } else {
                let sr = new ServiceResponse(false, appConstants.USER_NOT_VALIDATED);
                return sr.getServiceResponse();
            }
        } else {
            let sr = new ServiceResponse(false, appConstants.TOKEN_MISSING);
            return sr.getServiceResponse();
        }

    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}
const updateUserBalance = async (req, res) => {
    try {
        const mongoDb = dbVars.db;
        let token = req.headers['x-access-token'] || req.headers['auth'];
        if (token) {
            let paymentBalance = req.body.paymentBalance;
            if (paymentBalance === null || paymentBalance === undefined || !req.body.id) {
                let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
                return sr.getServiceResponse();
            }
            let reqData = {
                paymentBalance: paymentBalance
            }
            let result = await mongoDb.collection("users").findOneAndUpdate({ _id: ObjectId(req.body.id) }, { $set: reqData });
            console.log("User List", result)
            let sr = new ServiceResponse(true, appConstants.RECORD_UPDATED);
            return sr.getServiceResponse();
        } else {
            let sr = new ServiceResponse(false, appConstants.TOKEN_MISSING);
            return sr.getServiceResponse();
        }

    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}
const createUser = async (req, res) => {
    try {
        // console.log("DBBVARS",dbVars.client.db().users())
        const mongoDb = dbVars.db;
        let userData = req.body;
        userData.isAdmin = 0;
        userData.createDate = new _Date();
        userData.updateDate = new _Date();
        userData.token = "";
        userData.verified = false;
        let isValidate = await validateUserDetails(userData, "users");
        if (isValidate.status) {
            if (isValidate.res === appConstants.USER_NOT_VERIFIED) {
                // let sr = new ServiceResponse(false, appConstants.USER_NOT_CREATED);
                // return sr.getServiceResponse();                
            } else {
                let result = await mongoDb.collection("users").insertOne(userData);
                // if (result && result.insertedCount > 0) {
                //     let sr = new ServiceResponse(true, appConstants.USER_INSERTED);
                //     return sr.getServiceResponse();
                // }
                // let sr = new ServiceResponse(false, appConstants.USER_NOT_CREATED);
                // return sr.getServiceResponse();
            }
            let _otpRes = await sendOtp(req, res);
            if (_otpRes.status) {
                let sr = new ServiceResponse(true, _otpRes.res);
                return sr.getServiceResponse();
            }
            let sr = new ServiceResponse(false, appConstants.USER_NOT_CREATED);
            return sr.getServiceResponse();
        } else {
            return isValidate;
        }
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
    // let isValidate = await validateUserDetails(userData);

}

const validateUserDetails = async (userData, collectionName) => {
    const mongoDb = dbVars.db;
    try {
        if (userData.contactNo) {
            let result = await mongoDb.collection(collectionName).find({ contactNo: userData.contactNo }).toArray();
            if (result && result.length > 0) {
                if (!result[0].verified) {
                    let sr = new ServiceResponse(true, appConstants.USER_NOT_VERIFIED);
                    return sr.getServiceResponse();
                }
                let sr = new ServiceResponse(false, appConstants.USER_ALREADY_EXIST);
                return sr.getServiceResponse();
            }
            let sr = new ServiceResponse(true, null);
            return sr.getServiceResponse();
        } else {
            let sr = new ServiceResponse(false, appConstants.USER_NOT_VALIDATED);
            return sr.getServiceResponse();
        }
    }
    catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const isOlderDate = utility.isOlderDate

const sendOtp = async (req, res) => {
    try {
        let reqData = req.body;
        const mongoDb = dbVars.db;
        let userDetails = await mongoDb.collection("users").find({ contactNo: reqData.contactNo }).toArray();
        if (userDetails && userDetails.length > 0) {
            reqData.createDate = new _Date();
            reqData.updateDate = new _Date();
            reqData.otp = generateOtp();
            reqData.count = 0;
            let latestReq = await getLatestOtpReq(reqData);
            let otpRecord;
            if (latestReq.status) {
                if (isOlderDate(latestReq.res.updateDate)) {
                    otpRecord = await enterOtpRecord(reqData)
                } else {
                    otpRecord = await updateOtp(reqData, latestReq.res._id)
                    // reqData.count = latestReq.res.count + 1;
                    // if (latestReq.res.count <= 5) {
                    //     otpRecord = await updateOtp(reqData, latestReq.res._id)
                    // } else {
                    //     let sr = new ServiceResponse(false, appConstants.MAX_OTP_REACH);
                    //     return sr.getServiceResponse();
                    // }
                }
            } else {
                otpRecord = await enterOtpRecord(reqData);
            }
            if (otpRecord.status)
                // return EmailService.sendMail(reqData.contactNo, `OTP - ${reqData.otp}   `, appConstants.EMAIL_SUBJECT.OTP);
                return SmsService.sendSms(reqData.contactNo, { otp: reqData.otp }, appConstants.SMS_TEMPLATE.otpTemplate);
            return otpRecord;
        } else {
            let sr = new ServiceResponse(false, appConstants.USER_NOT_REGISTERED);
            return sr.getServiceResponse();
        }

    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const enterOtpRecord = async (reqData) => {
    const mongoDb = dbVars.db;
    try {
        let result = await mongoDb.collection("userOtp").insertOne(reqData);
        let sr = new ServiceResponse(true, null);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const generateOtp = () => {
    return Math.floor((Math.random() * 10000) + 999);
}

const updateOtp = async (reqData, id) => {
    try {
        const mongoDb = dbVars.db;
        let existNo = await mongoDb.collection("userOtp").findOneAndUpdate({ _id: id }, { $set: reqData });
        console.log("EXIST NO", existNo); let sr = new ServiceResponse(true, existNo.value);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const updateUser = async (userData, contactNo) => {
    try {
        const mongoDb = dbVars.db;
        let existNo = await mongoDb.collection("users").findOneAndUpdate({ contactNo: contactNo }, { $set: userData });
        delete existNo.value.password;
        let latest = await mongoDb.collection("users").find({ contactNo: contactNo }).toArray();
        if (latest && latest.length > 0) {
            let sr = new ServiceResponse(true, latest[0]);
            return sr.getServiceResponse();
        }
        let sr = new ServiceResponse(false, null);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const getLatestOtpReq = async (reqData) => {
    try {
        const mongoDb = dbVars.db;
        let latest = await mongoDb.collection("userOtp").find({ contactNo: reqData.contactNo }).sort({ "updateDate": -1 }).limit(1).toArray();
        if (latest && latest.length > 0) {
            let sr = new ServiceResponse(true, latest[0]);
            return sr.getServiceResponse();
        }
        let sr = new ServiceResponse(false, null);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString);
        return sr.getServiceResponse();
    }
}

const verifyOtp = async (req, res) => {
    try {
        const mongoDb = dbVars.db;
        let reqData = req.body;
        console.log("REQ data", reqData)
        if (reqData.contactNo && reqData.otp && reqData.reqType && (reqData.reqType === "login" || reqData.reqType === "signup")) {
            let userOtp = await mongoDb.collection("userOtp").find({ contactNo: reqData.contactNo }).sort({ "updateDate": -1 }).limit(1).toArray();
            if (userOtp && userOtp.length > 0) {
                userOtp = userOtp[0];
                if (!isOlderDate(userOtp.updateDate)) {
                    if (reqData.otp === userOtp.otp) {
                        if (reqData.reqType === "login") {
                            let _updateRow = await login(req, res);
                            if (_updateRow.status) {
                                let sr = new ServiceResponse(true, _updateRow.res);
                                return sr.getServiceResponse();
                            }
                        } else {
                            let obj = {}
                            obj.verified = true;
                            obj.token = await utility.generateJWTTocken(reqData.contactNo)
                            let _updateRow = await updateUser(obj, reqData.contactNo);
                            if (_updateRow.status) {
                                let sr = new ServiceResponse(true, _updateRow.res);
                                return sr.getServiceResponse();
                            }
                        }
                        let sr = new ServiceResponse(true, appConstants.OTP_VERIFIED);
                        return sr.getServiceResponse();
                    } else {
                        let sr = new ServiceResponse(false, appConstants.OTP_INVALID);
                        return sr.getServiceResponse();
                    }
                } else {
                    let sr = new ServiceResponse(false, appConstants.RESEND_OTP);
                    return sr.getServiceResponse();
                }
            } else {
                let sr = new ServiceResponse(false, appConstants.NOT_VALID_NO);
                return sr.getServiceResponse();
            }
        } else {
            let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
            return sr.getServiceResponse();
        }
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString);
        return sr.getServiceResponse();
    }
}

const login = async (req, res) => {
    try {
        const mongoDb = dbVars.db;
        let userData = req.body;
        let userDetails = await mongoDb.collection("users").find({ contactNo: userData.contactNo, verified: true }).toArray();
        if (userDetails && userDetails.length > 0) {
            userDetails = userDetails[0];
            userDetails.token = await utility.generateJWTTocken(userDetails.contactNo);
            userDetails.updateDate = new _Date();
            await mongoDb.collection("users").updateOne({ _id: userDetails._id }, { $set: { ...userDetails } });
            delete userDetails.password;
            let sr = new ServiceResponse(true, userDetails);
            return sr.getServiceResponse();
        } else {
            let sr = new ServiceResponse(false, appConstants.USER_NOT_VALIDATED);
            return sr.getServiceResponse();
        }
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString);
        return sr.getServiceResponse();
    }
}

module.exports = {
    createUser: createUser,
    getUserList: getUserList,
    sendOtp: sendOtp,
    verifyOtp: verifyOtp,
    login: login,
    getDefaultUser: getDefaultUser,
    updateUserBalance: updateUserBalance,
    getMyInfo:getMyInfo
}