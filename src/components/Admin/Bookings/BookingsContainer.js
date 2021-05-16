import { connect } from 'react-redux';
import actions  from '../../../store/actions';
import Bookings from "./index";

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
        bookingStatusAction:(qs) => dispatch(actions.bookingStatus(qs)),
        getRoutesAction: () => dispatch(actions.getRoutes()),
        refundAction: (data) => dispatch(actions.bookingRefund(data)),
        getBusAction: () => dispatch(actions.getBus())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookings);