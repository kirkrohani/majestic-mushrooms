import React from 'react';
import { Table, Segment, Label } from 'semantic-ui-react';

class MailViewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
    };
  }

  // put in Main
  // handleMessageClick(msg) {
  //   this.setState({
  //     view: ''
  //   });
  // }

  render() {
  
    return (
      <Table.Row>
        <Table.Cell>
          <Label circular color={this.props.color}>{this.props.from.charAt(0)}</Label>
          {'     ' + this.props.from}
        </Table.Cell>
        <Table.Cell style={{fontWeight: 'bold'}}>{this.props.subject}</Table.Cell>
        <Table.Cell>{this.props.snippet}</Table.Cell>
      </Table.Row>
    );
  }
}

export default MailViewListEntry;