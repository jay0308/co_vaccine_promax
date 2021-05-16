import {loaderAction,genericPopupAction, successAction} from "./commonActions";
import * as request from "../../utils/requests";
import constants from "../../utils/constants";

export const createPost = (formData) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.createPost,formData,{ 'Content-Type': 'multipart/form-data' })
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer,"postCreated":res.results.body}));
                dispatch(genericPopupAction(res.results.body));
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

export const getPost = () => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(constants.APIS.getPost)
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                dispatch(successAction({...getState().successReducer, "getPosts":res.results.body}));
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

export const likePost = (postId) => {
    return ((dispatch,getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.likePost,{postId})
        .then((res)=>{
            res = res.data;
            dispatch(loaderAction(false))
            if(!res.results.exception){
                // dispatch(successAction({...getState().successReducer, "postLiked":res.results.body}));
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

