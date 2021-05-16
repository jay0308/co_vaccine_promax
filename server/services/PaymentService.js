const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const request = require('request');

let instamojo_base_uri = process.env.INSTAMOJO_BASE_URI;
let app_base_uri = process.env.NODE_ENV === "development" ? "http://localhost:5000" : process.env.PUBLIC_URL

const instaMojoPaymentRequest = async (data) => {

    var headers = { 'X-Api-Key': process.env.INSTAMOJO_API_KEY, 'X-Auth-Token': process.env.INSTAMOJO_AUTH_TOKEN }
    var payload = {
        purpose: data.bookingId.toString(),
        amount: data.totalFair,
        phone: data.contactNo,
        buyer_name: data.name,
        redirect_url: `${app_base_uri}/postPayment/${data.bookingId}`,
        // send_email: true,
        // webhook: `${app_base_uri}/webhook/`,
        send_sms: true,
        // email: 'foo@example.com',
        allow_repeated_payments: false
    }

    let result = await requestPromise(payload,headers)
    return result
}

const requestPromise = (payload,headers) => {
    console.log("Headers",payload,headers)
    return new Promise((resolve,reject) => {
        request.post(`${instamojo_base_uri}/payment-requests/`, { form: payload, headers: headers }, function (error, response, body) {
            if (!error && (response.statusCode === 201 || response.statusCode === 200)) {
                console.log(body);
                let sr = new ServiceResponse(true, body);
                resolve(sr.getServiceResponse())
                
            }else{
                console.log("Error Instamojo:",response.body)
                let sr = new ServiceResponse(false, appConstants.PAYMENT_FAILED+" "+response.statusCode);
                resolve(sr.getServiceResponse());
            }
        })
    })
}
module.exports = {
    instaMojoPaymentRequest
}

