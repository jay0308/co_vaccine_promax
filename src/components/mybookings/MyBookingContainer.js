import { connect } from 'react-redux';
import actions from '../../store/actions';
import MyBookings from "./index";

const mapStateToProps = (state) => {
    return {
        userDataReducer: state.userDataReducer || null,
        userList: state.successReducer && state.successReducer.getUserList || null,
        successReducer: state.successReducer || null,
        appErrorMsg: state.appErrorMsgReducer || null
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loaderAction: (val) => dispatch(actions.loaderAction(val)),
        getUser: (query) => dispatch(actions.getUser(query)),
        getMyInfoAction: () => dispatch(actions.getMyinfo()),
        successAction: (data) => dispatch(actions.successAction(data)),
        bookingStatusAction: (qs) => dispatch(actions.bookingStatus(qs)),
        cancelBookingAction: (data) => dispatch(actions.cancelBooking(data)),
        getRoutesAction: () => dispatch(actions.getRoutes())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyBookings);