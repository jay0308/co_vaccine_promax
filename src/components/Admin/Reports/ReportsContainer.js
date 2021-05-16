import { connect } from 'react-redux';
import actions from '../../../store/actions';
import Reports from "./Reports";

const mapStateToProps = (state) => {
    return {
        loaderReducer: state.loaderReducer,
        successReducer: state.successReducer,
        userDataReducer: state.userDataReducer
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loaderAction: (val) => dispatch(actions.loaderAction(val)),
        successAction: (data) => dispatch(actions.successAction(data)),
        getRoutesAction: () => dispatch(actions.getRoutes()),
        bookingBusReportsAction: (data) => dispatch(actions.bookingBusReports(data)),
        getDefaultUserAction: () => dispatch(actions.getDefaultUser()),
        updateUserBalanceAction: (data) => dispatch(actions.updateUserBalance(data)),
        sendTripStatusAction:(data) => dispatch(actions.sendTripStatus(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reports);