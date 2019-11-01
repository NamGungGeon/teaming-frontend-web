import React, { Component } from "react";
import styles from "./Popup.module.css";

class Popup extends Component {
  render() {
    const { children, plzClose } = this.props;
    return (
      <div
        className={styles.background}
        onMouseUp={plzClose}
        onKeyDown={e => {
          if (e.key === "esc") plzClose();
        }}
      >
        <div
          className={styles.content}
          onMouseUp={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Popup;
