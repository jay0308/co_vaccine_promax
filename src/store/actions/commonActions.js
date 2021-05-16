

import * as request from "../../utils/requests";
import constants from "../../utils/constants";

export function loaderAction(val) {
    return {
        type: 'LOADER',
        payload: val
    };
}

export function successAction(val) {
    return {
        type: 'SUCCESS',
        payload: val
    };
}

export function genericPopupAction(val) {
    return {
        type: 'GENERIC_POPUP',
        payload: val
    };
}

export function userDataAction(val) {
    return {
        type: 'USER_DATA',
        payload: val
    };
}

export function appErrorMsgAction(val) {
    return {
        type: 'APP_ERROR_MSG',
        payload: val
    };
}

export const clearPostCreated = () => {
    return ((dispatch,getState) => {
        dispatch(successAction({...getState().successReduser,"postCreated":null}));
    });
}

export const getPlayerStyles = () => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(constants.APIS.getPlayerStyles)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer, "getPlayerStyles":res.results.body}));
            }else{
                dispatch(genericPopupAction(res.message));
            }
            console.log("Res",res)

        })
        .catch((error)=>{
            dispatch(loaderAction(false))
            dispatch(genericPopupAction(error.toString()));
            console.log("Error",error)
        })
    });
}

export function scoringAction(val) {
    return {
        type: 'SCORING',
        payload: val
    };
}