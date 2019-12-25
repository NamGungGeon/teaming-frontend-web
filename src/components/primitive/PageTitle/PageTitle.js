import React, { Component } from 'react';
import classNames from 'classnames';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

class PageTitle extends Component {
  static defaultProps = {
    titleColor: 'white',
    explain: '',
    align: 'left'
  };
  render() {
    const { title, titleColor, explain, align, noMargin } = this.props;
    return (
      <AlignLayout align={align}>
        {!noMargin && (
          <div>
            <br />
            <br />
          </div>
        )}
        <h3
          className={classNames('title')}
          style={{ color: titleColor }}
        >
          {title}
        </h3>
        {explain && (
          <p
            className={classNames('explain')}
            style={{ color: titleColor, opacity: '0.8' }}
          >
            {explain}
          </p>
        )}
        {!noMargin && (
          <div>
            <br />
            <br />
          </div>
        )}
      </AlignLayout>
    );
  }
}

export default PageTitle;
