import React, {Component} from 'react';
import {randStr} from "../../lib/utils";
import {quickConnect} from "../../redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import Polaroids from "../../containers/Polaroids/Polaroids";
import Button from "reactstrap/es/Button";

class PolaroidsZone extends Component {

    polaroidContents=[
        {img: '', title: randStr(5), explain: randStr(10), content: randStr(30),
            onClick: ()=>{this.props.uiKit.toaster.cooking(randStr('20'))},
            buttons: [(<Button color={'primary'} size={'sm'}>check</Button>),(<Button color={'secondary'} size={'sm'}>cancel</Button>)],
        },
        {img: '', title: randStr(5), explain: randStr(10), content: randStr(30),
            onClick: ()=>{this.props.uiKit.toaster.cooking(randStr('20'))},
            buttons: [(<Button color={'primary'} size={'sm'}>check</Button>),(<Button color={'secondary'} size={'sm'}>cancel</Button>)],
        },
        {img: '', title: randStr(5), explain: randStr(10), content: randStr(30),
            onClick: ()=>{this.props.uiKit.toaster.cooking(randStr('20'))},
            buttons: [(<Button color={'primary'} size={'sm'}>check</Button>),(<Button color={'secondary'} size={'sm'}>cancel</Button>)],
        },
        {img: '', title: randStr(5), explain: randStr(10), content: randStr(30),
            onClick: ()=>{this.props.uiKit.toaster.cooking(randStr('20'))},
            buttons: [(<Button color={'primary'} size={'sm'}>check</Button>),(<Button color={'secondary'} size={'sm'}>cancel</Button>)],
        },
    ];
    render() {
        return (
            <div>
                <PageTitle title={'Here is Polaroid Zone'} explain={'enjoy ref!'} centering/>
                <Polaroids polaroidContents={this.polaroidContents}/>
            </div>
        );
    }
}

export default quickConnect(PolaroidsZone);