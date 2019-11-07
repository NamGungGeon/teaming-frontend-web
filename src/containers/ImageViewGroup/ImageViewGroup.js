import React, { Component } from 'react';
import ImageView from '../../components/ImageView/ImageView';
import styles from './ImageViewGroup.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ImageViewGroup extends Component {
  static defaultProps = {
    icons: [],
    width: 'auto'
  };
  static propTypes = {
    icons: PropTypes.array,
    width: PropTypes.string
  };

  render() {
    const { icons, style, width: fixedWidth } = this.props;
    return (
      <div className={styles.group} style={style}>
        {icons.map(icon => {
          const { img, label, onClick, shape, width } = icon;
          return (
            <div
              className={classNames({ clickable: onClick })}
              onClick={onClick ? onClick : () => {}}
            >
              <ImageView
                img={img}
                shape={shape}
                width={width ? width : fixedWidth}
              />
              {icon.label && <span className={styles.label}>{label}</span>}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ImageViewGroup;
