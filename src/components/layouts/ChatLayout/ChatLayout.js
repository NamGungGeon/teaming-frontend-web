import React from 'react';
import styles from './ChatLayout.module.css';
import PropTypes from 'prop-types';

const ChatLayout = ({ chat, tools }) => {
  const chatStyle = tools ? {} : { width: '100%' };

  return (
    <div className={styles.wrapper}>
      {tools ? <div className={styles.info}>{tools}</div> : ''}
      <div className={styles.chat} style={chatStyle}>
        {chat}
      </div>
    </div>
  );
};

ChatLayout.propTypes = {
  chat: PropTypes.element.isRequired,
  children: PropTypes.element
};

export default ChatLayout;
