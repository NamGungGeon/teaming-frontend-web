import React, { Component } from "react";
import styles from "./VerticalNavigation.module.css";
import logo from "../../res/icon.png";
import { NavLink } from "react-router-dom";
import { getPath } from "../../lib/url";
import { quickConnect } from "../../redux";
import classNames from "classnames";

class VerticalNavigation extends Component {
  quickMenus = [
    {
      title: "Samples",
      to: "/sample",
      alwaysShow: true
    },
    {
      title: "Guide",
      to: "/guide",
      alwaysShow: true
    }
  ];

  render() {
    const { auth, nav } = this.props;
    console.log(auth);
    return (
      <nav className={classNames(styles.vertical)}>
        <span className={styles.left}>
          <NavLink to={getPath("/")}>
            <img src={logo} alt="" className={styles.icon} />
          </NavLink>
        </span>
        <span className={styles.right}>
          {this.quickMenus.map(value =>
            value.requireAuth === !!auth || value.alwaysShow ? (
              <NavLink to={getPath(value.to)}>{value.title}</NavLink>
            ) : (
              ""
            )
          )}
        </span>
      </nav>
    );
  }
}

export default quickConnect(VerticalNavigation);
