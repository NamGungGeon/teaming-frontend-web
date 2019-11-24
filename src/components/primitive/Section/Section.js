import React, { Component } from 'react';
import styles from './Section.module.css';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';

class Section extends Component {
  render() {
    const { children } = this.props;
    const childs= Array.isArray(children)? children: [children];

    return (
      <AlignLayout align="center">
        <div className={styles.wrapper}>
          {childs.map((child,idx) => {
            return <div key={`${child.toString().slice(0, 5)}_${idx}`} className={styles.section}>{child}</div>;
          })}
        </div>
      </AlignLayout>
    );
  }
}

export default Section;
