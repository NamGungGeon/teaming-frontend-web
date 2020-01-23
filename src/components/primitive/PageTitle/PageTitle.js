import React, { Component } from 'react';
import classNames from 'classnames';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import styles from './PageTitle.module.css';

class PageTitle extends Component {
  static defaultProps = {
    titleColor: '#202020',
    explain: '',
    align: 'left'
  };
  render() {
    const { title, titleColor, explain, align } = this.props;
    return (
      <div className={styles.wrapper}>
        <h4
          className={classNames('title')}
          style={{ color: titleColor }}
        >
          {title}
        </h4>
        {explain && (
          <p
            className={classNames('explain')}
            style={{ color: titleColor, opacity: '0.8' }}
          >
            {explain}
          </p>
        )}
      </div>
    );
  }
}

export default PageTitle;
