import React, {Component} from 'react';
import styles from './HorizontalNavigation.module.css';
import classNames from 'classnames';
import {quickConnect} from "../../redux";
import {NavLink} from "react-router-dom";
import fullIcon from '../../res/full_icon.png';


class HorizontalNavigation extends Component {
    render() {
        const {menus, only}= this.props;
        classNames();
        return (
            <nav className={classNames(styles.horizontal)}>
                <div>
                    {
                        menus && menus.map((value)=>{
                            if(!only || !value.type || value.type===only)
                                return (
                                    <div><NavLink to={value.to}>{value.title}</NavLink></div>
                                )
                        })
                    }
                </div>
                <div>
                </div>
            </nav>
        );
    }
}

export default quickConnect(HorizontalNavigation);