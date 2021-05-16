import axios from "axios";
let envString = process.env.NODE_ENV;
let envJson = require(`./${envString}.json`);
let base_url = envJson["PUBLIC_URL"];

export const getRequest = (url,headers={}) => {
    url = `${base_url}/api${url}`;
    const options = {
        method: 'get',
        url: url,
        headers:headers,
        crossorigin:true
      };
    return axios(options)
}

export const postRequest = (url,data,headers={}) => {
    url = `${base_url}/api${url}`;
    const options = {
        method: 'post',
        url: url,
        headers:headers,
        data:data,
        crossorigin:true
      };
    return axios(options)
}

export const getRequestWithToken = (url,headers={}) => {
    url = `${base_url}/api${url}`;
    headers = {...headers}
    headers["auth"] = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")).token : "" ;
    const options = {
        method: 'get',
        url: url,
        headers:headers,
        crossorigin:true
      };
    return axios(options)
}

export const postRequestWithToken = (url,data,headers={}) => {
    url = `${base_url}/api${url}`;
    headers = {...headers}
    headers["auth"] = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")).token : "" ;
    const options = {
        method: 'post',
        url: url,
        headers:headers,
        data:data,
        crossorigin:true
      };
    return axios(options)
}