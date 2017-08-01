import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const handleArrowClick = (arrowDirection) => {
    
};

const ReadEmailHeader = (props) => {
  const { currentMessage, handleArrowClick } = props;
  console.log('inside reademailheader: ');
  return (
  
    <Table.Header>
      <Table.Row height="100px">
          <Table.HeaderCell colSpan='2' style={{wordWrap: 'normal'}}>
            <h2>{currentMessage.subject}</h2>
          </Table.HeaderCell>

          <Table.HeaderCell colSpan='1' textAlign='right'> 
            {currentMessage.messageIndex > 0 ? <Icon name="chevron left" onClick={() => {handleArrowClick(-1);}}/> : null}
            {currentMessage.messageIndex < props.messagesLength ? <Icon name="chevron right" onClick={() => {handleArrowClick(1);}}/> : null}
            <Menu.Item as={Link} to='/' > <Icon name='remove' /> </Menu.Item>
          </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  
  );
};

export default ReadEmailHeader;