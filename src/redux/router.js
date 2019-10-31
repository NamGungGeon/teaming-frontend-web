
import {handleActions, createAction} from 'redux-actions';
import {randStr} from "../lib/utils";


//initial state is null
//must initiate in [ROOT].js
const history= null;

const INIT= randStr(30);

export const init= createAction(INIT);

export default handleActions({
    [INIT]: (bundle, action)=>{
        if(!action.payload)
            throw "history init is fail since passed payload is null (redux/router.js)";

        return action.payload;
    },
}, history);



