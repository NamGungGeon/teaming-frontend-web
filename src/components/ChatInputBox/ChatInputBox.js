import React, { Component } from 'react';
import styles from './ChatInputBox.module.css';
import PropTypes from 'prop-types';
import { Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { quickConnect } from '../../redux';
import Button from 'reactstrap/es/Button';
import { Send } from '@material-ui/icons';

class ChatInputBox extends Component {
  static propTypes = {
    hint: PropTypes.string,
    type: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.value !== this.state.value) {
      console.log(this.state.value);
    }
  }

  render() {
    const { hint, type, onSubmit: submit } = this.props;
    const { value } = this.state;

    return (
      <Form className="chat-submission-form" onSubmit={submit(value)}>
        <InputGroup>
          <Input
            type={type}
            innerRef={ref => (this.inputBox = ref)}
            placeholder={hint}
            onChange={event => {
              event.preventDefault();
              this.setState({ value: event.target.value });
            }}
          />
          <InputGroupAddon addonType="append">
            <Button type="submit" color={'danger'}>
              <Send color={'white'} style={{ fontSize: '1rem' }} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

export default quickConnect(ChatInputBox);
