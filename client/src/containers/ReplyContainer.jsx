import { connect } from 'react-redux';
import Reply from '../components/Reply.jsx';

const mapStateToProps = (state) => {
  view:   state.view;
};

const mapDispatchToProps = (dispatch) => {

};


export default connect(
  mapStateToProps,
  null
)(Reply);