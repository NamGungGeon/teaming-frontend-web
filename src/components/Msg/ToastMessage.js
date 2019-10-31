import React, {Component} from 'react';
import styles from './ToastMessage.module.css';

class ToastMessage extends Component {


    render() {
        const {msg}= this.props;
        return (
            <div className={styles.toaster}>
                {msg && msg.map((value)=>{
                    if(!value) return;
                    return (<div><div className={styles.toast}>{value}</div></div>);
                })}
            </div>
        );
    }
}

export default ToastMessage;