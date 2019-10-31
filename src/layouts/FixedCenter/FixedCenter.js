import React, {Component} from 'react';
import styles from './FixedCenter.module.css';

class FixedCenter extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default FixedCenter;