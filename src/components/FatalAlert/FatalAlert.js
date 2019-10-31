import React, {Component} from 'react';
import styles from './FatalAlert.module.css';
import Button from "@material-ui/core/Button";
import {getPath, prefix} from "../../lib/url";
import {quickConnect} from "../../redux";

class FatalAlert extends Component {
    render() {
        const {msg}= this.props;
        return (
            <div className={styles.parent}>
                <h1>
                    Oops!! Fatal Error Raise!
                </h1>
                <h3>
                    {msg? msg: 'Sorry, This is unknown error.'}
                </h3>
                <br/>
                <br/>
                <br/>
                <div  className={styles.bottomBtn}>
                    <Button variant="contained" color="primary">
                        refresh this page (press F5)
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="secondary" onClick={()=>{window.location= getPath('/')}}>
                        Back to Main page
                    </Button>
                </div>
            </div>
        );
    }
}

export default quickConnect(FatalAlert);