import { connect } from 'react-redux';
import actions  from '../../store/actions';
import Home from "./Home";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        loaderReducer: state.loaderReducer,
        successReducer:state.successReducer,
        userDataReducer:state.userDataReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loaderAction: (val) => dispatch(actions.loaderAction(val)),
        successAction:(data) => dispatch(actions.successAction(data)),
        getBeneficiaryAction:() =>  dispatch(actions.co_benefeciary())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));