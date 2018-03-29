import { Action, AnyAction, Middleware } from 'redux';
import { REGISTER_FAIL } from '../register/actionTypes';
import { createBrowserHistory } from 'history'
import { Dispatch } from 'react-redux';
import { LOGIN_SUCCESS } from '../login/actionTypes';

const redirectMiddleware= ({dispatch,getState}:any)=>(next:any)=>(action:AnyAction)=>{
    const browserHistory = createBrowserHistory()
    switch(action.type){
        case REGISTER_FAIL:{

            browserHistory.push("/login")
        }

        default:

    }

    return next(action);
}

export default redirectMiddleware