import React, {Component} from 'react';
import styles from './BottomNavigation.module.css';
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import {getPath} from "../../lib/url";

class BottomNavigation extends Component {
    render() {
        const {left, right}= this.props;
        return (
            <nav className={classNames(styles.vertical, {hide: !left && !right})}>
                <span className={styles.left}>
                    {
                        left && left
                    }
                </span>
                <span className={styles.right}>
                    {
                        right && right
                    }
                </span>
            </nav>
        );
    }
}

export default BottomNavigation;