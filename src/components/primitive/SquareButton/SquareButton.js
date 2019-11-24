import React from 'react';
import styles from './SquareButton.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function SquareButton({
  onClick,
  icon,
  label,
  style,
}) {
  return (
    <div
      style={style}
      className={classNames([styles.button, {[styles.disable]: !onClick}])}
      onClick={onClick}
    >
      <img src={icon} alt="" className={styles.icon}/>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

SquareButton.defaultProps = {
  style: {},
  label: '',
  icon: '',
};

SquareButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.string,
  label: PropTypes.string,
};
