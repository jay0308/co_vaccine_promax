// const nexmo = require("../loaders/initializeSMS").nexmo;
const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const request = require('request');

// function sendSms(to, text,from="CricKhata"){
//     if(!nexmo){        
//         let sr = new ServiceResponse(false,appConstants.SMS_SERVICE_NOT_AVAILABLE);
//         return sr.getServiceResponse();  
//     }
//     nexmo.message.sendSms(from, `91${to}`, text);
//     let sr = new ServiceResponse(true,appConstants.SMS_SENT);
//     return sr.getServiceResponse();  
// }



function smsTemplate(templateName, data) {
    switch (templateName) {
        // case appConstants.SMS_TEMPLATE.bookingTemplate:
        //     return `Thank you ${data.name} for booking with GUIDE TRAVELS
        //     Details: Seating Capacity: 54(BUS 3 X 2)X1
        //     From: ${data.src} To ${data.dest}
        //     Total Fair:${data.fairPrice}
        //     Dt. of Journey: ${data.journeyDate}
        //     Pickup time: ${data.journeyTime}
        //     `;
        case appConstants.SMS_TEMPLATE.bookingTemplate:
            return `
                Bus Name:${data.busName}
                Bus Type:${data.busType}
                Bus No:${data.busNo}
                Seat No:${data.seatNo}
                From:${data.src}
                To: ${data.dest}
                Pick up point: ${data.src}
                Dep time:${data.journeyTime}
                Dt. of Journey: ${data.journeyDate}
                Thankyou  ${data.name} for using GUIDE BUS App.
            `;
        case appConstants.SMS_TEMPLATE.tripConfirmed:
            return `
                    Driver Name:${data.driverName}
                    Driver Mobile Number:${data.driverNo}
                    Pickup Man Name:${data.pickupManName}
                    Pickup Man Mobile Number:${data.pickupManNo}
                    Trip Status:${"Confirmed"}
                `;
        case appConstants.SMS_TEMPLATE.busDetailTemplate:
            return `Dear RIZWAN,
            Your Bus No is MH 43 H 9792
            Bus Name is SPEED
            Pickup Man: MANOJ(98344~01801)
            Pickup Point: V K R OFF
            Rept Time: 07:00AM
            Happy Journey.
            GUIDE TRAVELS`;
        case appConstants.SMS_TEMPLATE.otpTemplate:
            return `GUIDE TRAVELS OTP
                ${data.otp}
            `;
        default:
            return "";
    }
}

function sendSms(contactNo, data, templateName) {
    let url = `http://text.bluemedia.in/http-api.php?username=guide&password=9876543210&senderid=GUIDET&route=6&number=${contactNo}&message=${smsTemplate(templateName, data)}`;
    let _res = true;
    console.log(url)
    request.get(url)
        .on('response', function (response) {
            if (!response.statusCode === 200) {
                _res = false
            }
            console.log(response.data) // 200
            console.log(response.headers['content-type']) // 'image/png'
        })
        .on('error', function (err) {
            _res = false
            console.error(err)
        })

    let sr = new ServiceResponse(_res, _res ? appConstants.SMS_SENT : appConstants.SMS_SERVICE_NOT_AVAILABLE);
    return sr.getServiceResponse();
}

module.exports = {
    sendSms: sendSms
}

