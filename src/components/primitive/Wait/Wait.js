import React, { Component } from 'react';
import styles from './Wait.module.css';
import ImageView from '../ImageView/ImageView';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

class Wait extends Component {
  render() {
    const { msg } = this.props;

    return (
      <AlignLayout className={styles.wrapper} align={'center'}>
        <ImageView
          style={{
            width: '128px'
          }}
          className={styles.logo}
        />
        <br />
        <br />
        {msg && (
          <h5 className={styles.msg}>
            {msg}
            <br />
            <br />
            <br />
          </h5>
        )}
      </AlignLayout>
    );
  }
}

export default Wait;
