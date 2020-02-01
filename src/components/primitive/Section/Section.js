import React from 'react';
import styles from './Section.module.css';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Section = ({ children, divideStyle, className, style }) => {
  return (
    <AlignLayout
      style={{
        ...style
      }}
      className={className}
      align="left"
    >
      <div
        style={{
          ...style
        }}
        className={classNames(styles.wrapper, styles[divideStyle], className)}
      >
        {children}
      </div>
    </AlignLayout>
  );
};

Section.defaultProps = {
  divideStyle: '',
  className: '',
  style: {},
};
Section.propTypes = {
  // divideStyle: PropTypes.oneOf(['', 'none']),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Section;
