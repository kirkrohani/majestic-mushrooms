import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu.jsx';
import { setView, setPage, setAreResults } from '../actions';

const mapStateToProps = (state) => {
  return {
    view:  state.view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewView: (viewName) => {
      dispatch(setView(viewName));
    },
    setPage: (page) => {
      dispatch(setPage(page));
    },
    setAreResults: (boolean) => {
      dispatch(setAreResults(boolean));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu);

