import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { quickConnect } from '../../../redux/quick';
import Button from 'reactstrap/es/Button';
import { MdSend } from 'react-icons/md';

class ChatInputBox extends Component {
  static propTypes = {
    hint: PropTypes.string,
    type: PropTypes.string,
    sendMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    hint: '',
    type: 'text'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { sendMessage } = this.props;
    const { value } = this.state;
    sendMessage(value);
    this.setState({ value: '' });
  };

  render() {
    const { hint, type } = this.props;
    return (
      <Form className="chat-submission-form" onSubmit={this.handleSubmit}>
        <InputGroup>
          <Input
            style={{
              backgroundColor: 'white!important'
            }}
            className={'transparent'}
            type={type}
            value={this.state.value}
            innerRef={ref => (this.inputBox = ref)}
            placeholder={hint}
            onChange={this.handleChange}
          />
          <InputGroupAddon addonType="append">
            <Button type="submit" color={'danger'}>
              <MdSend style={{ fontSize: '1rem' }} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

export default quickConnect(ChatInputBox);
