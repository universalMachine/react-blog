import { LOGIN_ADD, LOGIN_FAIL, LOGIN_SUCCESS } from './actionTypes';

export default (state: any={loginStatus: "default"}, action: any)=>{
    switch (action.type){
        case LOGIN_ADD:
            return state
        case LOGIN_FAIL:
            return {...state,loginStatus:LOGIN_FAIL}
        case LOGIN_SUCCESS:
            return {...state,loginStatus: LOGIN_SUCCESS}
        default:
            return state
    }
}