import React, { Component } from 'react';
import styles from './Window.module.css';
import classNames from 'classnames';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Collapse from "reactstrap/es/Collapse";

class Window extends Component {
  state = {
    folded: true
  };
  static defaultProps = {
    title: '',
    children: '',
    position: null,
    startBottom: false,
    foldable: false,
    styles: {},
    className: ''
  };

  render() {
    const { title, children, foldable, style } = this.props;
    return (
      <div className={classNames([styles.frame, classNames()])} style={style}>
        <div
          className={classNames([
            styles.title,
            `${foldable ? 'clickable' : ''}`
          ])}
          onClick={() => {
            if (foldable)
              this.setState({
                ...this.state,
                folded: !this.state.folded
              });
          }}
        >
          <b>{title}</b>
          {foldable && (
            <div className={styles.mileStone}>
              {this.state.folded ? <MdExpandMore /> : <MdExpandLess/>}
            </div>
          )}
        </div>
        <Collapse isOpen={this.state.folded} className={styles.body}>
          {children}
        </Collapse>
      </div>
    );
  }
}

export default Window;
