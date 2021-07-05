import {loaderAction,genericPopupAction, successAction, userDataAction} from "./commonActions";
import * as request from "../../utils/requests";
import constants from "../../utils/constants";
import crypto from 'crypto';

export const co_generateToken = (mobNo) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        let reqObj = {
            "mobile": mobNo,
            "secret": "U2FsdGVkX1+z/4Nr9nta+2DrVJSv7KS6VoQUSQ1ZXYDx/CJUkWxFYG6P3iM/VW+6jLQ9RDQVzp/RcZ8kbT41xw=="
        }
        request.postRequest(constants.APIS.co_generateToken, reqObj)
            .then((res) => {
                dispatch(loaderAction(false))
                if (res.status === 200) {
                    dispatch(successAction({ ...getState().successReducer, "co_generateToken_res": res.data }));
                } else {
                    dispatch(genericPopupAction("Error in Generating token"));
                }
                console.log("Res", res)

            })
            .catch((error) => {
                dispatch(loaderAction(false))
                dispatch(genericPopupAction(error.toString()));
                console.log("Error", error)
            })
    });
}

export const co_validateOtp = (otp,txnId) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        const hash = crypto.createHash('sha256',"U2FsdGVkX1+z/4Nr9nta+2DrVJSv7KS6VoQUSQ1ZXYDx/CJUkWxFYG6P3iM/VW+6jLQ9RDQVzp/RcZ8kbT41xw==").update(otp+"").digest('hex');
        let reqObj = {"otp": hash, "txnId": txnId}
        request.postRequest(constants.APIS.co_validateOtp, reqObj)
            .then((res) => {
                dispatch(loaderAction(false))
                if (res.status === 200) {
                    // dispatch(successAction({ ...getState().successReducer, "co_generateToken_res": res.data }));
                    userDataAction(res.data)
                    localStorage.setItem("userInfo", JSON.stringify(res.data))
                    window.location.href = "/"
                } else {
                    dispatch(genericPopupAction("Unable to Validate OTP"));
                }
                console.log("Res", res)

            })
            .catch((error) => {
                dispatch(loaderAction(false))
                dispatch(genericPopupAction(error.toString()));
                console.log("Error", error)
            })
    });
}

export const co_benefeciary = () => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(constants.APIS.co_beneficiary)
            .then((res) => {
                dispatch(loaderAction(false))
                if (res.status === 200) {
                    dispatch(successAction({ ...getState().successReducer, "co_benefeciary_res": res.data }));
                } else {
                    dispatch(genericPopupAction("Unable to Validate OTP"));
                }
                console.log("Res", res)

            })
            .catch((error) => {
                dispatch(loaderAction(false))
                dispatch(genericPopupAction(error.toString()));
                console.log("Error", error)
                if(error.toString().indexOf("401") > -1){
                    localStorage.removeItem("userInfo");
                    window.location.href = "/"
                }
            })
    });
}

export const getStates = () => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(constants.APIS.getStates)
            .then((res) => {
                dispatch(loaderAction(false))
                if (res.status === 200) {
                    dispatch(successAction({ ...getState().successReducer, "stateList": res.data }));
                }
            })
            .catch((error) => {
                dispatch(loaderAction(false))
                dispatch(genericPopupAction(error.toString()));
                console.log("Error", error)
            })
    });
}

export const getDistricts = (qs) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(constants.APIS.getDistricts(qs))
            .then((res) => {
                dispatch(loaderAction(false))
                if (res.status === 200) {
                    dispatch(successAction({ ...getState().successReducer, "districtList": res.data }));
                }
            })
            .catch((error) => {
                dispatch(loaderAction(false))
                dispatch(genericPopupAction(error.toString()));
                console.log("Error", error)
            })
    });
}


