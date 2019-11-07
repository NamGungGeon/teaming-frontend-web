import React, { Component } from 'react';
import PropTypes from 'prop-types';
import empty from '../../res/simple_icon.png';
import styles from './ImageView.module.css';
import classNames from 'classnames';

class ImageView extends Component {
  static defaultProps = {
    img: empty,
    shape: 'square',
    border: '0.6px solid #33333300',
    shadow: false,
    width: 'auto',
    style: {},
    onClick: null,
    className: ''
  };
  static propTypes = {
    img: PropTypes.oneOf([PropTypes.string, PropTypes.element]),
    shape: PropTypes.oneOf(['square', 'rounding', 'circle']),
    border: PropTypes.string,
    shadow: PropTypes.bool,
    width: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    className: PropTypes.string
  };

  render() {
    const {
      img,
      shape,
      border,
      width,
      shadow,
      style,
      onClick,
      className
    } = this.props;
    if (typeof img === 'string')
      return (
        <img
          src={img}
          alt={'ImageView'}
          className={classNames(
            {
              [styles[shape]]: true,
              shadowing: !!shadow,
              clickable: !!onClick
            },
            className
          )}
          style={{
            ...style,
            border: border,
            width: width ? width : 'auto',
            height: 'auto'
          }}
          onClick={onClick ? onClick : () => {}}
        />
      );
    else return img;
  }
}

export default ImageView;
