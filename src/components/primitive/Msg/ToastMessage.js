import React, { Component } from 'react';
import styles from './ToastMessage.module.css';
import PropTypes from 'prop-types';

class ToastMessage extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div className={styles.toaster}>
        {msg &&
          msg.map((value, idx) => {
            return (
              <div className={styles.toast} key={`${value}_${idx}`}>
                {value}
              </div>
            );
          })}
      </div>
    );
  }
}

ToastMessage.propTypes = {
  msg: PropTypes.array
};
ToastMessage.defaultProps = {
  msg: []
};

export default ToastMessage;
