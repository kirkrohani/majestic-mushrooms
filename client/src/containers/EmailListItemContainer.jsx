import { connect } from 'react-redux';
import { setView, setMessageToRead } from '../actions';
import EmailListItem from '../components/EmailListItem.jsx';

const mapStateToProps = (state) => {
  return {
    messages:       state.messages,
    view:           state.view,
    searchResults:  state.search.searchResults
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessageToRead: (newMessage, messageIndex) => {
      dispatch(setMessageToRead(newMessage, messageIndex));
    },
    setNewView:         (view) => {
      dispatch(setView(view));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailListItem);

