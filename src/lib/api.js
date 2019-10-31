import {randStr} from "./utils";

export const login= async (email, pw)=>{
    return new Promise((rs, rj)=>{
       if(!email || !pw){
           rj('이메일과 비밀번호를 모두 입력하세요');
           return;
       }
       rs(randStr(20));
    });
};