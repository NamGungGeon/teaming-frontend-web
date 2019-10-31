import React, {Component} from 'react';
import styles from './SearchBox.module.css';
import Input from "reactstrap/es/Input";
import PropTypes from 'prop-types';
import {InputGroupAddon, InputGroupText} from "reactstrap";
import InputGroup from "reactstrap/es/InputGroup";
import {quickConnect} from "../../redux";
import Button from "reactstrap/es/Button";
import {Search} from '@material-ui/icons';


class SearchBox extends Component {
    static propTypes= {
        hint: PropTypes.string,
        type: PropTypes.string,
        submit: PropTypes.func,
    }
    static defaultProps= {
        hint: '',
        type: 'text',
        submit: ()=>{},
    }
    state= {
        value: '',
    }

    flush= ()=>{
        this.inputBox.value= '';
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.value!== this.state.value)
            console.log(this.state.value);
    }

    render() {
        const {hint, type, submit, onChange}= this.props;
        return (
            <div className={styles.wrapper}>
                <InputGroup>
                    <Input type={type}
                           innerRef={ref=> this.inputBox= ref}
                           placeholder={hint}
                           onKeyDown={(e)=>{
                               if(e.key=== 'Enter'){
                                   if(submit(this.state.value))
                                       this.flush();
                               }}}
                           onChange={(e)=>{
                               if(onChange)
                                   onChange(e.target.value);
                               this.setState({...this.state, value: e.target.value});
                           }}/>
                    <InputGroupAddon addonType="append">
                        <Button onClick={()=>{
                            if(submit(this.state.value))
                                this.flush();
                        }} color={'danger'}>
                            <Search color={'white'}/>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

export default quickConnect(SearchBox);