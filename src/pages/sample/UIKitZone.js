import React, {Component} from 'react';
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "reactstrap/es/Button";
import {quickConnect} from "../../redux";
import {delay} from "../../lib/utils";

class UiKitZone extends Component {

    makeToast= ()=>{
        this.props.uiKit.toaster.cooking('toast msg', 1000);
    }
    openPopup= ()=>{
        this.props.uiKit.popup.make(
            (<div>
                <h4>Dialog Title</h4>
                <p>Dialog Content</p>
                <br/>
                <Button color={'danger'} onClick={this.props.uiKit.popup.destroy}>
                    Close
                </Button>
            </div>)
        );
    }
    raiseException= ()=>{
        this.props.uiKit.exception.raise('EXCEPTION MSG');
    }
    onLoading= async ()=>{
        this.props.uiKit.loading.start();
        await delay(1000);
        this.props.uiKit.loading.end();
    }


    render() {
        return (
            <div>
                <PageTitle title={'Uikit'} explain={'you can make Toast, Popup(Dialog), Exception, Loading using uiKit'} centering/>

                <div className={'centering childMargin'}>
                    <Button color={'primary'} onClick={this.makeToast}>Toast</Button>
                    <Button color={'secondary'} onClick={this.openPopup}>Popup</Button>
                    <Button color={'danger'} onClick={this.raiseException}>Exception</Button>
                    <Button color={'info'} onClick={this.onLoading}>Loading</Button>
                </div>
            </div>
        );
    }
}

export default quickConnect(UiKitZone);