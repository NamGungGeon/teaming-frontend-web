import React, { Component } from 'react';
import styles from './Polaroids.module.css';
import PropTypes from 'prop-types';
import Polaroid from '../../primitive/Polaroid/Polaroid';

class Polaroids extends Component {
  static propTypes = {
    polaroidContents: PropTypes.array
  };

  static defaultProps = {
    polaroidContents: []
  };

  render() {
    const { polaroidContents } = this.props;
    return (
      <div className={styles.wrapper}>
        {polaroidContents.map(polaroidContent => {
          return (
            <Polaroid
              img={polaroidContent.img}
              title={polaroidContent.title}
              explain={polaroidContent.explain}
              content={polaroidContent.content}
              onClick={polaroidContent.onClick}
              style={polaroidContent.style}
              buttons={polaroidContent.buttons}
            />
          );
        })}
      </div>
    );
  }
}

export default Polaroids;
