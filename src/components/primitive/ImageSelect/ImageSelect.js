import React, { Component } from 'react';
import ImageView from '../ImageView/ImageView';
import styles from './ImageSelect.module.css';
import PropTypes from 'prop-types';
import {randStr} from "../../../utils/utils";

class ImageSelect extends Component {
  constructor(props){
    super(props);
    this.state= {
      selected: props.inits,
    };
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    const { multiple, selections} = this.props;
    const { selected } = this.state;
    const { selected: nextSelected}= nextState;

    if(selected!== nextSelected)
      selections(
        multiple===1?
          nextSelected[0]: nextSelected
      );
  }

  select = id => {
    const { selected } = this.state;
    const { multiple } = this.props;

    let newSelected = selected.slice();

    if (newSelected.findIndex(s => s === id) === -1) {
      //not selected
      if (selected.length === multiple)
        newSelected.pop();
      newSelected.push(id);
    } else {
      //already selected
      newSelected = selected.filter(s => {
        return s !== id;
      });
    }

    this.setState({
      ...this.state,
      selected: newSelected
    });
  };

  render() {
    const { icons, style } = this.props;
    const { selected } = this.state;

    return (
      <div className={styles.group} style={style}>
        {icons.map(icon => {
          const { img, label, id, shape, height } = icon;
          return (
            <div
              key={randStr(5)}
              onClick={() => {
                this.select(id);
              }}
            >
              <ImageView
                img={img}
                shape={shape}
                height={height}
                className={`${
                  selected.findIndex(s => s === id) !== -1
                    ? styles.selected
                    : ''
                }`}
              />
              {icon.label && <span className={styles.label}>{label}</span>}
            </div>
          );
        })}
      </div>
    );
  }
}


ImageSelect.defaultProps = {
  icons: [],
  multiple: 1,
  selections: selects => {},
  inits: []
};

ImageSelect.propTypes = {
  icons: PropTypes.array,
  multiple: PropTypes.number,
  selections: PropTypes.func,
  inits: PropTypes.array
};

export default ImageSelect;
