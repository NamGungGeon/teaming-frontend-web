import React, { Component } from 'react';
import styles from './Popup.module.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class Popup extends Component {
  render() {
    const { children, plzClose, buttons } = this.props;
    return (
      <div
        className={styles.background}
        onMouseUp={plzClose}
        onKeyDown={e => {
          if (e.key === 'esc') plzClose();
        }}
      >
        <div
          className={styles.modal}
          onMouseUp={e => {
            e.stopPropagation();
          }}
        >
          <div className={styles.content}>{children}</div>
        </div>
        {buttons && buttons !== 'default' && (
          <div className={styles.buttons}>{buttons}</div>
        )}
        {buttons === 'default' && (
          <div
            className={styles.buttons}
            onMouseUp={e => {
              e.stopPropagation();
            }}
          >
            <Button variant={'contained'} onClick={plzClose} size={'small'}>
              닫기
            </Button>
          </div>
        )}
      </div>
    );
  }
}

Popup.propTypes = {
  buttons: PropTypes.oneOf([PropTypes.element, PropTypes.string])
};

export default Popup;
