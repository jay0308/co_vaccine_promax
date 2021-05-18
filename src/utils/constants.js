const constants = {
    APIS:{
        sendOtp:"/user/send/otp",
        verifyOtp:"/user/verify/otp",
        createUser:"/user/create",
        createPost:"/post/create",
        getPost:"/post",
        likePost:"/post/like",
        getUser:"/user/",
        getMyInfo:"/user/myInfo",
        getDefaultUser:"/user/default",
        updateUserBalance:"/user/balance/update",
        getPlayerStyles:"/util/playerStyles",
        getRoutes:"/bus/routes",
        createRoutes:"/bus/routes/add",
        editRoutes:"/bus/routes/edit",
        deleteRoutes:"/bus//routes/delete",
        createBusType:"/bus/types/add/all",
        editBusType:"/bus/types/edit",
        getBusType:"/bus/types",
        deleteBusType:"/bus/types/delete",
        getBus:"/bus",
        createBus:"/bus/create",
        editBus:"/bus/edit",
        deleteBus:"/bus/delete",
        searchBus:"/bus/search",
        bookingDetails:"/booking/details",
        bookSeat:"/booking/add",
        cancelBooking:"/booking/cancel",
        payBooking:"/booking/pay",
        bookingStatus:"/booking/status/details",
        bookingInstamojo:"/booking/instamojo",
        bookingRefund:"/booking/refund",
        getReports:"/booking/reports",
        sendTripStatus:"/booking/send/tripStatus",

        // coWin APIS
        co_generateToken:"/v2/auth/generateMobileOTP",
        co_validateOtp:"/v2/auth/validateMobileOtp",
        co_beneficiary:"/v2/appointment/beneficiaries"
    },
    MSGS:{
        genericErrorMsg:"Oops, Something went wrong"
    }
}

export default constants;