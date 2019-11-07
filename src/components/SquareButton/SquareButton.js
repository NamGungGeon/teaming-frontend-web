import React from 'react';
import styles from './SquareButton.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import logo from '../../res/icon.png';

export default function SquareButton({
  children,
  backgroundColor,
  onClick,
  minHeight
}) {
  return (
    <div
      className={classNames([styles.button, `${onClick ? styles.enable : ''}`])}
      style={{ backgroundColor, minHeight }}
      onClick={onClick}
    >
      {children}
      <img src={logo} alt="teaming-logo-bottom-right" />
    </div>
  );
}

SquareButton.defaultProps = {
  backgroundColor: '#ffd000',
  minHeight: '350px'
};

SquareButton.propTypes = {
  backgroundColor: PropTypes.oneOf(['#ffd000', '#fc0474', '#03d8fe']),
  onClick: PropTypes.func.isRequired,
  minHeight: PropTypes.string
};
