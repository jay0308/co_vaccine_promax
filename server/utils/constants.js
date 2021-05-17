module.exports = {
    appConstants:{
        USER_NOT_VALIDATED:"User is not validated",
        USER_NOT_REGISTERED:"User is not register with us, please register first",
        USER_INSERTED:"User data is inserted",
        USER_NOT_CREATED:"User is not created",
        USER_ALREADY_EXIST:"User already exists",
        SMS_SERVICE_NOT_AVAILABLE:"SMS service is not available",
        EMAIL_SERVICE_NOT_AVAILABLE:"Email service is not available",
        SMS_SENT:"SMS is sent to user",
        EMAIL_SENT:"Email is sent to user",
        OTP_SENT:"Otp sent to user",
        MAX_OTP_REACH:"Maximum Otp verification reached, try again after 6 hours",
        FIELD_PARAM_MISSING:"Field param is missing",
        NOT_VALID_NO:"Not a valid no",
        OTP_VERIFIED:"Otp is verified",
        OTP_INVALID:"Otp is invalid",
        RESEND_OTP:"Resend otp",
        NOT_VALID_TOKEN:"Not a valid token, please login again",
        TOKEN_MISSING:"Access token is missing, please login again",
        USER_NOT_VERIFIED:"User not verified",
        POST_CREATED:"Post created",
        POST_NOT_CREATED:"Post not created",
        IMAGE_NOT_UPLOADED_TO_DRIVE:"Image not uploaded to drive",
        IMAGE_UPLOADED_TO_DRIVE:"Image uploaded to drive",
        POST_NOT_FOUND:"Post not found",
        POST_LIKED:"Post liked",
        BUS_CREATED:"Bus Created",
        BUS_NOT_CREATED:"Bus not created",
        BUS_NOT_FOUND:"Bus not found",
        BUS_UPDATED:"Bus updated",
        BUS_DELETED:"Bus deleted",
        RECORD_SAVED:"Recor saved successfully",
        RECORD_NOT_SAVED:"Something went wrong in saving the record",
        RECORD_DELETED:"Record deleted successfully",
        RECORD_UPDATED:"Record updated",
        SEAT_BOOKED:"Seat is already booked by others",
        SEAT_LOCKED:"Your seat has been locked",
        BOOKING_CONFIRM:"Payment has been successfully transfered, your booking is confirmed",
        PAYMENT_SESSION_TIME_OUT:"Payment session timed out",
        PAYMENT_SUCCEED:"Payment has been done",
        PAYMENT_FAILED:"Payment has been failed",
        PAYMENT_NOT_DONE:"Payment not done",
        BOOKING_CANCELED:"Booking Canceled",
        BOOKING_REFUNDED:"Booking refunded",
        ERROR_MSG:"Something went wrong",
        BATSMEN_OPTION:[
            "Right hand batsmen",
            "Left hand batsmen"
        ],
        BALLER_OPTION:[
            "Right arm spin baller",
            "Left arm spin baller",
            "Right arm medium fast baller",
            "Left arm medium fast baller",
            "Right arm fast baller",
            "Left arm fast baller",
        ],
        SMS_TEMPLATE:{
            "bookingTemplate":"bookingTemplate",
            "busDetailTemplate":"busDetailTemplate",
            "otpTemplate":"otpTemplate",
            "tripConfirmed":"tripConfirmed"
        },
        EMAIL_SUBJECT:{
            OTP:"OTP"
        }

    },
    APIS:{
        getDistricts: stateId => `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`,
        getCentersByDisctric: (districtId,date) => `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`
    }
}