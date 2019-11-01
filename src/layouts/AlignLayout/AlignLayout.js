import React, { Component } from "react";
import PropTypes from "prop-types";

class AlignLayout extends Component {
  static defaultProps = {
    align: "left",
    className: "",
    style: {}
  };
  static propTypes = {
    align: PropTypes.oneOf(["left", "center", "right"]),
    className: PropTypes.string,
    style: PropTypes.object
  };
  render() {
    const { align, children, className, style } = this.props;
    return (
      <div className={className} style={{ ...style, textAlign: align }}>
        {children}
      </div>
    );
  }
}

export default AlignLayout;
