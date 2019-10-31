import React, {Component} from 'react';
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import styles from './Login.module.css';
import icon from '../../res/full_icon.png';
import Button from "reactstrap/es/Button";
import {getPath} from "../../lib/url";
import {quickConnect} from "../../redux";
import {delay} from "../../lib/utils";
import * as Api from '../../lib/api';

class Login extends Component {
    state= {
        email: '',
        pw: '',
    };
    move= (url)=>{
        return ()=>{this.props.history.push(url)};
    };
    login= async ()=>{
        const {email, pw}= this.state;
        const {uiKit, AuthDispatcher}= this.props;

        uiKit.loading.start();
        await Api.login(email, pw).then((token)=>{
            AuthDispatcher.login({
                email,
                token
            });
            this.move(getPath('/mypage'))();
        }).catch((e)=>{
            uiKit.toaster.cooking(e);
        }).finally(()=>{
            uiKit.loading.end();
        });
    };

    componentDidMount() {
        console.log(this.props);
        if(this.props.auth){
            this.props.history.push(getPath('/mypage'));
        }
    }

    render() {
        return (
            <div className={styles.parent}>
                <div className={styles.child}>
                    <img src={icon} alt="" className={styles.icon}/>
                    <div className={styles.form}>
                        <FormGroup>
                            <Label for={"email"}>이메일</Label>
                            <Input type={"email"} name={"email"} id={"email"}
                                   placeholder={"이메일을 입력하세요"}
                                   onChange={(e)=>{
                                       this.setState({
                                           ...this.state,
                                           email: e.target.value
                                       });
                                   }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={"pw"}>비밀번호</Label>
                            <Input type={"password"} name={"pw"} id={"pw"}
                                   placeholder={"비밀번호를 입력하세요"}
                                   onChange={(e)=>{
                                       this.setState({
                                           ...this.state,
                                           pw: e.target.value
                                       });
                                   }}/>
                        </FormGroup>
                        <br/>
                        <FormGroup className={styles.buttons}>
                            <Button color={"primary"} onClick={()=>{this.login()}}>로그인</Button>
                            <Button outline color={'primary'} onClick={()=>{}}>회원가입</Button>
                        </FormGroup>
                        <Button style={{width: '100%'}}>ID/PW찾기</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default quickConnect(Login);