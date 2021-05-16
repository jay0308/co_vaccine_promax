import { connect } from 'react-redux';
import actions  from '../../store/actions';
import Scoring from "./index";

const mapStateToProps = (state) => {
    return {
        userDataReducer: state.userDataReducer || null,
        userList:state.successReducer && state.successReducer.getUserList || null,
        successReducer:state.successReducer || null,
        scoringReducer:state.scoringReducer || {}
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loaderAction: (val) => dispatch(actions.loaderAction(val)),
        getUser: (query) => dispatch(actions.getUser(query)),
        successAction:(data) => dispatch(actions.successAction(data)),
        scoringAction : (data) => dispatch(actions.scoringAction(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Scoring);