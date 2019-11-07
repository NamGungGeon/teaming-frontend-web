import React, { Component } from 'react';
import classNames from 'classnames';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

class PageTitle extends Component {
  static defaultProps = {
    titleColor: 'white',
    explain: ''
  };
  render() {
    const { title, titleColor, explain, centering, noMargin } = this.props;
    return (
      <AlignLayout align={centering ? 'center' : 'left'}>
        {!noMargin && (
          <div>
            <br />
            <br />
          </div>
        )}
        <p
          className={classNames('title')}
          style={{ fontFamily: "'Do Hyeon', sans-serif", color: titleColor }}
        >
          {title}
        </p>
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
