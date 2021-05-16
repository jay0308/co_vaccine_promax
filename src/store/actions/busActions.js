import {loaderAction,genericPopupAction, successAction} from "./commonActions";
import * as request from "../../utils/requests";
import constants from "../../utils/constants";

export const getRoutes = () => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(constants.APIS.getRoutes)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"getRoutes":res.results.body}));
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

export const createRoutes = (routeData) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.createRoutes,routeData)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"createRoutes":res.results.body}));
                dispatch(getRoutes());
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
export const editRoutes = (routeData) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.editRoutes,routeData)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"editRoutes":res.results.body}));
                dispatch(getRoutes());
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

export const deleteRoutes = (id) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(`${constants.APIS.deleteRoutes}/${id}`)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"deleteRoutes":res.results.body}));
                dispatch(getRoutes());
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
export const getBusType = (id) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(`${constants.APIS.getBusType}${id?"/"+id:""}`)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                if(id){
                    dispatch(successAction({...getState().successReducer,"getBusTypebyId":res.results.body}));
                }else{
                    dispatch(successAction({...getState().successReducer,"getBusType":res.results.body}));
                }
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

export const createBusType = (busTypeData) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.createBusType,busTypeData)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"createBusType":res.results.body}));
                dispatch(getBusType());
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
export const editBusType = (busTypeData) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.editBusType,busTypeData)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"editBusType":res.results.body}));
                dispatch(getBusType());
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
export const deleteBusType = (id) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(`${constants.APIS.deleteBusType}/${id}`)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"deleteBusType":res.results.body}));
                dispatch(getBusType());
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


export const getBus = () => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(constants.APIS.getBus)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"getBus":res.results.body}));
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

export const createBus = (busTypeData) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.createBus,busTypeData)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"createBus":res.results.body}));
                dispatch(getBus())
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
export const editBus = (busTypeData) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.editBus,busTypeData)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"editBus":res.results.body}));
                dispatch(getBus())
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
export const deleteBus = (id) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(`${constants.APIS.deleteBus}/${id}`)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"deleteBus":res.results.body}));
                dispatch(getBus())
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

export const searchBus = (qs) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(`${constants.APIS.searchBus}${qs}`)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"searchBusResult":res.results.body}));
                // dispatch(getBus())
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

