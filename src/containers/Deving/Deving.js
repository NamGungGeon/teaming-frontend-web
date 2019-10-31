import React, {Component} from 'react';
import PageTitle from "../../components/PageTitle/PageTitle";

class Deving extends Component {
    render() {
        const {msg}= this.props;
        return (
            <div className={'centering'}>
                <img src="https://png.pngtree.com/svg/20140418/break_fix_904402.png" alt="" width={'300px'}/>
                <PageTitle title={'Sorry. Not Ready yet.'} explain={msg? msg: 'See you later'}/>
            </div>
        );
    }
}

export default Deving;