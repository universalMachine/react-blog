import { REGISTER_ADD } from './actionTypes';

export default (state: any=[], action: any)=>{
    switch (action.type){
        case REGISTER_ADD:
            return {success: "success",...state}
        default:
            return state
    }
}