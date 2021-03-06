import React, { Component } from 'react';
import ImageView from '../../primitive/ImageView/ImageView';
import styles from './ImageViewGroup.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ImageViewGroup extends Component {
  static defaultProps = {
    icons: []
  };
  static propTypes = {
    icons: PropTypes.array
  };

  render() {
    const { icons, style } = this.props;
    return (
      <div className={styles.group}>
        {icons.map((icon, idx) => {
          const { img, label, onClick, shape, tooltip } = icon;
          return (
            <div
              style={style}
              key={`${icon.toString()}_${idx}`}
              className={classNames({ clickable: onClick })}
              onClick={onClick ? onClick : () => {}}
            >
              <ImageView
                tooltip={tooltip}
                key={`${icon.toString()}_${idx}`}
                img={img}
                shape={shape}
                style={icon.style}
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
