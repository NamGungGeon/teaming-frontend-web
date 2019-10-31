import React, {Component} from 'react';
import styles from "./Loading.module.css";

class Loading extends Component {
    render() {
        return (<div className={styles.loadingWrapper}>
                    <div className={styles['lds-heart']}><div></div></div>
                </div>);
    }
}

export default Loading;