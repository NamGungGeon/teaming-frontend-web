import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { quickConnect } from '../../../redux/quick';
import { MdSend } from 'react-icons/md';
import SearchBox from '../SearchBox/SearchBox';

const ChatInputBox = () => {
  const { hint, type, sendMessage } = this.props;
  return (
    <SearchBox
      className={'chat-submission-form'}
      hint={'채팅 내용을 입력하세요'}
      submit={text => {
        sendMessage(text);
        return true;
      }}
      buttonContent={<MdSend style={{ fontSize: '1rem' }} />}
    />
  );
};

ChatInputBox.propTypes = {
  sendMessage: PropTypes.func.isRequired
};

export default quickConnect(ChatInputBox);
