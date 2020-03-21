import React, { Component } from 'react';
import classNames from 'classnames';
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
          style={{ color: titleColor, textAlign: align }}
        >
          {title}
        </h4>
        {explain && (
          <p
            className={classNames('explain')}
            style={{ color: titleColor, opacity: '0.8', textAlign: align }}
          >
            {explain}
          </p>
        )}
      </div>
    );
  }
}

export default PageTitle;
