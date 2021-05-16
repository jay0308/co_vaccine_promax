import { loginSubmit, otpSubmit, createUser, getUser, getDefaultUser, updateUserBalance, getMyinfo } from "./userAction";
import { genericPopupAction, clearPostCreated, successAction, scoringAction, getPlayerStyles, appErrorMsgAction } from "./commonActions";
import { createPost, getPost, likePost } from "./postActions";
import {getRoutes,createRoutes,deleteRoutes,createBusType,editBusType,getBusType,deleteBusType,getBus,createBus,editBus, deleteBus, searchBus, editRoutes} from "./busActions";
import {getBookingDetails,bookSeat,cancelBooking,payBooking, bookingStatus, bookingInstamozo, bookingRefund, bookingBusReports, sendTripStatus} from "./bookingAction";

const actions = {
    loginSubmit,
    otpSubmit,
    genericPopupAction,
    createUser,
    createPost,
    getPost,
    clearPostCreated,
    likePost,
    getUser,
    getDefaultUser,
    getMyinfo,
    updateUserBalance,
    successAction,
    scoringAction,
    getPlayerStyles,
    appErrorMsgAction,
    getRoutes,
    createRoutes,
    editRoutes,
    deleteRoutes,
    createBusType,
    editBusType,
    getBusType,
    deleteBusType,
    getBus,
    createBus,
    editBus,
    deleteBus,
    searchBus,
    getBookingDetails,
    bookSeat,
    cancelBooking,
    payBooking,
    bookingStatus,
    bookingInstamozo,
    bookingRefund,
    bookingBusReports,
    sendTripStatus
}
export default actions;