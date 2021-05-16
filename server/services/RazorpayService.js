const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const request = require('request');

const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
const razorpayPaymentRequest = async (data) => {
    var options = {
        amount: data.totalFair,  // amount in the smallest currency unit
        currency: "INR",
        receipt: data.bookingId.toString(),
        payment_capture: '1'
    };

    let result = await requestPromise(options)
    return result
}

const requestPromise = (options) => {
    return new Promise((resolve, reject) => {

        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log("Error Razorpay:", err)
                let sr = new ServiceResponse(false, appConstants.PAYMENT_FAILED + " " + err);
                resolve(sr.getServiceResponse())
            }
            console.log("Razorpay response", order);
            let sr = new ServiceResponse(true, order);
            resolve(sr.getServiceResponse())
        });
    })
}
module.exports = {
    razorpayPaymentRequest
}

