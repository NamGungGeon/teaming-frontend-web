import React, { Component } from 'react';
import styles from './CardWrapper.module.css';

class CardWrapper extends Component {
  render() {
    return <div className={styles.wrapper}>{this.props.children}</div>;
  }
}

export default CardWrapper;
