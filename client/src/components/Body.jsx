import React from 'react';
import { Divider} from 'semantic-ui-react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import EmailListContainer from '../containers/EmailListContainer.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import { parseMessage } from './utils/messagesHelper';
import { today } from './utils/dateTimeHelper';
import UserMessage from './UserMessage.jsx';


class Body extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { view } = this.props;
    console.log('Inside Body.jsx rende with view: ', view);
    return (
      <div>
        <Divider hidden />
        <SearchContainer style={{marginBottom: '20px'}}/>
        <Divider hidden />
        { this.props.location.messageSent && 
        <div> 
          <UserMessage view={'DisplayMessage'} message={ 
          {
            title: 'Success!',
            body: 'Your message has been successfully sent..',
            color: 'green'
          }
          }/>
          <Divider hidden />
        </div>
        }
        { (view === 'Read' ||  view === 'Reply') && (
          <Redirect from={'/'} push to={'/message'}/>
        )}


        { view === 'Inbox' && (
           <EmailListContainer style={{border: '0'}}/>
        )}
        
       
      </div>
    );
  }
}

export default Body;

