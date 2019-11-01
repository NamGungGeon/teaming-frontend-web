import React, { Component } from 'react';
import styles from './ChatInputBox.module.css';
import Input from 'reactstrap/es/Input';
import PropTypes from 'prop-types';
import { InputGroupAddon, InputGroupText } from 'reactstrap';
import InputGroup from 'reactstrap/es/InputGroup';
import { quickConnect } from '../../redux';
import Button from 'reactstrap/es/Button';
import { Send } from '@material-ui/icons';

class ChatInputBox extends Component {
  static propTypes = {
    hint: PropTypes.string,
    type: PropTypes.string,
    submit: PropTypes.func
  };
  static defaultProps = {
    hint: '',
    type: 'text',
    submit: () => {}
  };
  state = {
    value: ''
  };

  flush = () => {
    this.inputBox.value = '';
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.value !== this.state.value) console.log(this.state.value);
  }

  render() {
    const { hint, type, submit } = this.props;
    return (
      <div className={styles.wrapper}>
        <InputGroup>
          <Input
            type={type}
            innerRef={ref => (this.inputBox = ref)}
            placeholder={hint}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (submit(this.state.value)) this.flush();
              }
            }}
            onChange={e => {
              this.setState({ ...this.state, value: e.target.value });
            }}
          />
          <InputGroupAddon addonType="append">
            <Button
              onClick={() => {
                if (submit(this.state.value)) this.flush();
              }}
              color={'danger'}
            >
              <Send color={'white'} style={{ fontSize: '1rem' }} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default quickConnect(ChatInputBox);
