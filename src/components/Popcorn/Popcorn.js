import React, {Component} from 'react';
import styles from './Popcorn.module.css';

class Popcorn extends Component {
    render() {
        const {children}= this.props;
        return (
            <div className={styles.parent}>
                {children}
            </div>
        );
    }
}

export default Popcorn;