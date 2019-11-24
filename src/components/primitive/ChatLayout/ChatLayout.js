import React from 'react';
import styles from './ChatLayout.module.css'
import PropTypes from 'prop-types';

const ChatLayout= ({chat, children})=> {
  const chatStyle= children? {}: {width: '100%'};

  return (
    <div className={styles.wrapper}>
      {
        children?
          (<div className={styles.info}>
            {children}
          </div>)
          :
          ''
      }
      <div className={styles.chat} style={chatStyle}>
        {chat}
      </div>
    </div>
  );
};

ChatLayout.propTypes={
  chat: PropTypes.element.isRequired,
  children: PropTypes.element,
};

export default ChatLayout;
