import React, { Component } from 'react';
import styles from './ChatMsg.module.css';
import classNames from 'classnames';
import logo from '../../res/icon.png';
import ImageView from '../ImageView/ImageView';

class ChatMsg extends Component {
  static defaultProps = {
    encounter: false,
    profile: null
  };

  render() {
    const { encounter, profile, msg } = this.props;
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
