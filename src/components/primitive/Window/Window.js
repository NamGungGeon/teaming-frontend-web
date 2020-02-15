import React, { Component } from 'react';
import styles from './Window.module.css';
import { MdExpandMore } from 'react-icons/md';
import { ExpansionPanel, ExpansionPanelDetails } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

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
    const { title, children, foldable } = this.props;
    return (
      <ExpansionPanel
        style={{
          padding: 0,
        }}
        onClick={() => {
          this.setState({
            ...this.state,
            folded: !this.state.folded
          });
        }}
        expanded={this.state.folded || !foldable}>
        <ExpansionPanelSummary
          style={{
            cursor: foldable? 'cursor': 'default',
            display: title? 'flex': 'none'
          }}
          className={styles.title}
          expandIcon={foldable? <MdExpandMore />: ''}>
          <div>{title}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className={styles.body}>
          <div>
            {children}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Window;
