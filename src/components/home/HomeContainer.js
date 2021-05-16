import { connect } from 'react-redux';
import actions  from '../../store/actions';
import Home from "./Home";

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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);