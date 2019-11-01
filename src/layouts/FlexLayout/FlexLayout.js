import React, { Component } from "react";
import styles from "./FlexLayout.module.css";
import classNames from "classnames";

class FlexLayout extends Component {
  static defaultProps = {
    align: "space-between",
    style: {}
  };
  render() {
    const { children, weights, margin, responsive, fixed, style } = this.props;
    console.log(children);
    let sumWeights = 0;
    if (weights)
      weights.map(weight => {
        sumWeights += weight;
      });

    return (
      <div
        className={classNames({
          [styles.responsive]: !!responsive,
          [styles.wrapper]: true
        })}
        style={{ ...style }}
      >
        {children.map((child, idx) => {
          const rate =
            100 / (sumWeights ? sumWeights / weights[idx] : children.length);
          if (!child) return;
          return (
            <div
              style={{
                width: `calc(${fixed ? fixed : `${parseInt(rate)}%`} - ${
                  margin ? margin * 2 : 0
                }px)`,
                margin: `${margin ? margin : 0}px`
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }
}

export default FlexLayout;
