import { connect } from 'react-redux';
import actions  from '../../../store/actions';
import BusDetails from "./BusDetails";

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
        getRoutesAction: () => dispatch(actions.getRoutes()),
        createRoutesAction: (val) => dispatch(actions.createRoutes(val)),
        editRoutesAction: (val) => dispatch(actions.editRoutes(val)),
        deleteRoutesAction: (val) => dispatch(actions.deleteRoutes(val)),
        createBusTypeAction: (val) => dispatch(actions.createBusType(val)),
        getBusTypeAction: () => dispatch(actions.getBusType()),
        deleteBusTypeAction: (val) => dispatch(actions.deleteBusType(val)),
        getBusAction: () => dispatch(actions.getBus()),
        createBusAction: (val) => dispatch(actions.createBus(val)),
        editBusAction: (val) => dispatch(actions.editBus(val)),
        deleteBusAction: (val) => dispatch(actions.deleteBus(val)),
        successAction:(data) => dispatch(actions.successAction(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BusDetails);