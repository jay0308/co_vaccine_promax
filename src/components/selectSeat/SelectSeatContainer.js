import { connect } from 'react-redux';
import actions  from '../../store/actions';
import SelectSeat from "./index";

const mapStateToProps = (state) => {
    return {
        loaderReducer: state.loaderReducer,
        successReducer:state.successReducer,
        userDataReducer:state.userDataReducer
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loaderAction: (val) => dispatch(actions.loaderAction(val)),
        successAction:(data) => dispatch(actions.successAction(data)),
        getRoutesAction: () => dispatch(actions.getRoutes()),
        getBusTypeAction: () => dispatch(actions.getBusType()),
        busSearchAction: (qs) => dispatch(actions.searchBus(qs)),
        bookingDetailsAction:(data) => dispatch(actions.getBookingDetails(data)),
        bookSeatAction:(data) => dispatch(actions.bookSeat(data)),
        preCancelBookingAction:(data) => dispatch(actions.cancelBooking(data)),
        postCancelBookingAction:(data) => dispatch(actions.postBookingCancel(data)),
        bookingInstamojoAction:(bookingId,qs) => dispatch(actions.bookingInstamozo(bookingId,qs)),
        payBookingAction:(data) => dispatch(actions.payBooking(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectSeat);