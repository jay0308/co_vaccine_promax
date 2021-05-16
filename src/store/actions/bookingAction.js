import { loaderAction, genericPopupAction, successAction } from "./commonActions";
import * as request from "../../utils/requests";
import constants from "../../utils/constants";
import global from "../../utils/common";
import lodash from "lodash";

export const getBookingDetails = (data) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.bookingDetails, data)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, ...{ "bookingDetails": res.results.body } }));
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const bookSeat = (data) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.bookSeat, data)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, "seatBooked": res.results.body }));
                    dispatch(refreshBookingDetails())
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const cancelBooking = (data) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.cancelBooking, data)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, "preBookingCanceled": res.results.body }));
                    dispatch(refreshBookingDetails())
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const bookingRefund = (data) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.bookingRefund, data)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, "bookingRefunded": res.results.body }));
                    dispatch(refreshBookingDetails())
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const bookingBusReports = (data) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.getReports, data)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, "bookingBusReports": res.results.body }));
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const sendTripStatus = (data) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.sendTripStatus, data)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, "sendTripStatus": res.results.body }));
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const payBooking = (data) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.postRequestWithToken(constants.APIS.payBooking, data)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, "payBooking": res.results.body }));
                    // if(lodash.get(res,"results.body.payment_request.longurl",true)){
                    //     window.location.href = res.results.body.payment_request.longurl;
                    // }
                    // dispatch(refreshBookingDetails())
                    razorpayCheckout(res.results.body,data.bookingId)
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const bookingStatus = (qs) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(`${constants.APIS.bookingStatus}${qs}`)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, "bookingStatus": res.results.body }));
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const bookingInstamozo = (bookingId, qs) => {
    return ((dispatch, getState) => {
        dispatch(loaderAction(true))
        request.getRequestWithToken(`${constants.APIS.bookingInstamojo}/${bookingId}${qs}`)
            .then((res) => {
                res = res.data;
                dispatch(loaderAction(false))
                if (!res.results.exception) {
                    dispatch(successAction({ ...getState().successReducer, "bookingInstamozo": res.results.body }));
                    if (window.location.pathname.indexOf("/admin") > -1) {
                        dispatch(genericPopupAction(res.results.body));
                        dispatch(refreshBookingDetails())
                    }
                } else {
                    dispatch(genericPopupAction(res.message));
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

export const refreshBookingDetails = () => {
    return ((dispatch, getState) => {

        window.location.reload()
    });
}


const razorpayCheckout = (razorpayRes,bookingId) => {
    let envString = process.env.NODE_ENV;
    let envJson = require(`../../utils/${envString}.json`);
    let keyId = envJson["RAZORPAY_KEY_ID"];
    let base_url = envJson["PUBLIC_URL"];

    var options = {
        "key": keyId, // Enter the Key ID generated from the Dashboard
        "amount": razorpayRes.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": razorpayRes.currency,
        "name": "Guide Bus",
        "description": "Booking Transaction",
        "image": "https://example.com/your_logo",
        "order_id": razorpayRes.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": `${base_url}/api/util/postPayment/${bookingId}|${razorpayRes.id}|${JSON.parse(localStorage.getItem('userInfo'))._id}`,
        "prefill": {
            "name": JSON.parse(localStorage.getItem('userInfo')).name,
            "email": "",
            "contact": JSON.parse(localStorage.getItem('userInfo')).contactNo
        },
        "notes": {
            "address": ""
        },
        "theme": {
            "color": "#FF3A43"
        }
    };
    console.log("OOPPP",options)
    if (window.Razorpay) {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();

    }
}