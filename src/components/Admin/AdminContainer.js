import { connect } from 'react-redux';
import actions  from '../../store/actions';
import Admin from "./Admin";

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
        bookingInstamojoAction:(bookingId,qs) => dispatch(actions.bookingInstamozo(bookingId,qs)),
        cancelBookingAction:(data) => dispatch(actions.cancelBooking(data)),
        getRoutesAction: () => dispatch(actions.getRoutes()),
        getBusTypeAction: () => dispatch(actions.getBusType()),
        busSearchAction: (qs) => dispatch(actions.searchBus(qs)),
        successAction:(data) => dispatch(actions.successAction(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);