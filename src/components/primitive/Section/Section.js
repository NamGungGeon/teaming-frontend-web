import React, { Component } from 'react';
import styles from './Section.module.css';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Section= ({children, divideStyle})=> {

  return (
    <AlignLayout align="center">
      <div
        className={classNames(styles.wrapper, styles[divideStyle])}>
        {
          children
        }
      </div>
    </AlignLayout>
  );
};

Section.defaultProps= {
  divideStyle: 'fill',
};
Section.propTypes= {
  divideStyle: PropTypes.oneOf(['outline', 'fill'])
}

export default Section;
