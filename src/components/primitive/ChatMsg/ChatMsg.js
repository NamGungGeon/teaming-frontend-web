import React, { Component } from 'react';
import styles from './ChatMsg.module.css';
import classNames from 'classnames';
import logo from '../../resource/icon.png';
import ImageView from '../ImageView/ImageView';

class ChatMsg extends Component {
  static defaultProps = {
    encounter: false,
    profile: null,
    msg: '',
    alert: null
  };

  render() {
    const { encounter, profile, msg, alert } = this.props;

    //alert message
    if (alert)
      return (
        <div className={classNames(styles.wrapper, styles.alert)}>{alert}</div>
      );

    //conversations
    return (
      <div
        className={classNames({
          [styles.wrapper]: true,
          [styles.encounter]: encounter
        })}
      >
        <ImageView
          img={profile ? profile : logo}
          width={'30px'}
          height={'30px'}
          className={styles.profile}
          shape={'circle'}
        />
        <div
          className={classNames([
            styles.msg,
            `${encounter ? styles.encounter : ''}`
          ])}
        >
          {msg}
        </div>
      </div>
    );
  }
}

export default ChatMsg;
