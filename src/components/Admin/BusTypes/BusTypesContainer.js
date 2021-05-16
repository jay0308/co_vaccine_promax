import { connect } from 'react-redux';
import actions  from '../../../store/actions';
import BusTypes from "./index";

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
        createBusTypeAction: (val) => dispatch(actions.createBusType(val)),
        editBusTypeAction: (val) => dispatch(actions.editBusType(val)),
        getBusTypeAction: () => dispatch(actions.getBusType()),
        deleteBusTypeAction: (val) => dispatch(actions.deleteBusType(val)),
        successAction:(data) => dispatch(actions.successAction(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BusTypes);