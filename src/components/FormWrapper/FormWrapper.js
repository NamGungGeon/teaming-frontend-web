import React, { Component } from "react";
import styles from "./FormWrapper.module.css";
import AlignLayout from "../../layouts/AlignLayout/AlignLayout";

class FormWrapper extends Component {
  render() {
    const { children } = this.props;
    return (
      <AlignLayout align={"center"}>
        <div className={styles.wrapper}>
          {children.map(child => {
            return <div className={styles.section}>{child}</div>;
          })}
        </div>
      </AlignLayout>
    );
  }
}

export default FormWrapper;
