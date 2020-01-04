import React from 'react';
import styles from './SquareButton.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import logo from '../../resource/icon.png';

export default function SquareButton({
  onClick,
  icon,
  label,
  style,
}) {
  return (
    <div
      style={style}
      className={
        classNames([
          styles.button,
          {[styles.disable]: !onClick},
          ])
      }
      onClick={onClick}>
      <div
        className={styles.icon}>
        {
          typeof icon === 'string'?
            (<img src={icon} alt="button icon"/>)
            :
            icon
        }
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

SquareButton.defaultProps = {
  style: {},
  label: '',
  icon: logo,
};

SquareButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
};
