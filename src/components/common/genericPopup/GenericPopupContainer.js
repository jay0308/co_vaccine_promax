import { connect } from 'react-redux';
import actions  from '../../../store/actions';
import GenericPopup from "./GenericPopup";

const mapStateToProps = (state) => {
    return {
        genericPopupReducer: state.genericPopupReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        genericPopupAction: (val) => dispatch(actions.genericPopupAction(val))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenericPopup);