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
          padding: 0
        }}
        onClick={() => {
          this.setState({
            ...this.state,
            folded: !this.state.folded
          });
        }}
        className={styles.body}
        expanded={this.state.folded || !foldable}
      >
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          <b>{title}</b>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Window;
