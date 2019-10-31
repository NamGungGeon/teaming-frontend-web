import React, {Component} from 'react';
import styles from './StickyNavigation.module.css';
import classNames from 'classnames';
import {updateState} from "../../lib/utils";


class StickyNavigation extends Component {
    state={
        current: 0,
    }

    render() {
        const {menus}= this.props;
        return (
            <nav className={styles.wrap}>
                {
                    menus.map((value, idx)=>{
                        const isCurrent= idx=== this.state.current;
                        return (
                            <div className={classNames({[styles.current]: isCurrent})}
                                onClick={()=>{
                                    if(value.onClick)
                                        value.onClick();

                                    updateState(this, {
                                       current: idx,
                                    });
                                }}>
                                {value.title}
                            </div>
                        )
                    })
                }
            </nav>
        );
    }
}

export default StickyNavigation;