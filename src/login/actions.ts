import { User } from './User';
import { LOGIN_ADD, LOGIN_FAIL, LOGIN_SUCCESS } from './actionTypes';


export const addLogin = (user:User)=>({
    type: LOGIN_ADD,
    user: user
});

export const loginSuccess = (res:any,history:History = null)=>({
    type: LOGIN_SUCCESS,
    history: history
})

export const LoginFail = (res:any)=>({
    type: LOGIN_FAIL
})


