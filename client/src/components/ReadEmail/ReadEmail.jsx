import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import { Message, Divider, Table, Icon, Label, Image, Menu } from 'semantic-ui-react';
import axios from 'axios';
import ReadMailEntry from './ReadMailEntry.jsx';
import EmailListItemContainer from '../../containers/EmailListItemContainer.jsx';
import Reply from '../Reply.jsx';
import { queryMessageDetailsToRead, parseMessage } from '../utils/messagesHelper.js';
import { WAIT_IMAGE } from '../utils/stylesHelper.js';
import { today } from '../utils/dateTimeHelper';
import ReadEmailHeader from './ReadEmailHeader.jsx';


class ReadEmail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentMessage, setThread } = this.props;
    var messageId = currentMessage.message_id;
    var threadId = currentMessage.thread_id;
    axios.get(`api/threads/${threadId}`)
    .then(response => {
      setThread(parseMessage(response.data, today));
    })
    .catch(error => {
      console.log('getThreads error: ', error);
    });
  }

  handleMessageClick() {
    // placeholder for thread click
    console.log("message clicked. not yet rigged");
  }
  
  handleArrowClick(arrowDirection) {
    console.log('Inside handleArrowClick with: ', arrowDirection);
    const newMessageIndex = this.props.currentMessage.messageIndex + arrowDirection;
    const { messages, setMessageToRead } = this.props;
    queryMessageDetailsToRead(messages[newMessageIndex].message_id, newMessageIndex, messages[newMessageIndex].unread, setMessageToRead );

  }

  createMarkup() {
    const { currentMessage } = this.props;
    return {__html: currentMessage.body};
  }

  render() {
    
    const { currentMessage, thread, messages } = this.props;

    return (
      <div>
      <Divider hidden />
      {thread.length === 0 ? ( <Image src={WAIT_IMAGE} centered size='small'/>) :
       (
        <Table fixed>
          <ReadEmailHeader currentMessage={currentMessage} messagesLength={messages.length} handleArrowClick={this.handleArrowClick.bind(this)}/>
                    
                    <Table.Body>
                    {<ReadMailEntry message={thread[0]} messageId={thread[0].message_id} />}
                    <Table.Row>
                    <Table.Cell colSpan='3'>
                    <div dangerouslySetInnerHTML={this.createMarkup()} ></div>
                    </Table.Cell>
                    </Table.Row>
                    {thread.slice(1, thread.length).map((message, index) => {
                      return <ReadMailEntry key={index} message={message} messageId={message.message_id} />;
                    })}

                    <Table.Row>
                    <Reply />
                    </Table.Row>
                    </Table.Body> 
        </Table>
                  )}
                  </div>
                );
              }
            }
            
export default ReadEmail;
