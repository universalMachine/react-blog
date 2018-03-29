import { User } from './User';
import { REGISTER_ADD, REGISTER_FAIL, REGISTER_SUCCESS } from './actionTypes';


export const addRegister = (user:User)=>({
    type: REGISTER_ADD,
    user: user
});

export const registerSuccess = (res:any)=>({
    type: REGISTER_SUCCESS
})

export const registerFail = (res:any)=>({
    type: REGISTER_FAIL
})


