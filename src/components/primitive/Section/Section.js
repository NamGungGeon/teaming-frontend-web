import React, { Component } from 'react';
import styles from './Section.module.css';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Section= ({children, divideStyle, className})=> {

  return (
    <AlignLayout align="left">
      <div
        className={classNames(styles.wrapper, styles[divideStyle], className)}>
        {
          children
        }
      </div>
    </AlignLayout>
  );
};

Section.defaultProps= {
  divideStyle: 'outline',
  className: '',
};
Section.propTypes= {
  divideStyle: PropTypes.oneOf(['outline', 'fill']),
  className: PropTypes.string,
}

export default Section;
