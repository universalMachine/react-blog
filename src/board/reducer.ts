import { AnyAction } from 'redux';
import {
    BOARD_ADD_FAIL, BOARD_ADD_STATUS_RESET, BOARD_ADD_SUCCESS, BOARD_DELETE_SUCCESS, BOARD_FETCH, BOARD_FETCH_FAIL,
    BOARD_FETCH_SUCCESS, BOARD_INIT_PAGE_INFO
} from './actionTypes';
import PageInfo from '../constant/PageInfo';
import { Board } from './Board';

const complete = "complete"

export default (state:any={boards:[],addStatus:"default",addMessage:"",pageInfo:{pageSize:1,pageNum:1},fetchStatus : "none",fetchResult:{}}, action:AnyAction)=>{
    switch (action.type){
        case BOARD_ADD_SUCCESS:
            return {...state,boards: [...state.boards,action.board],addStatus: BOARD_ADD_SUCCESS,addMessage:action.res.message}
        case BOARD_ADD_FAIL:
            return {...state,addStatus:BOARD_ADD_FAIL,addMessage:action.res.message}
        case BOARD_ADD_STATUS_RESET:
            return {...state,addStatus:"default"}
        case BOARD_FETCH:
            return {...state,fetchStatus:"start"}
        case BOARD_FETCH_SUCCESS:
            const data = action.res.data
            return{...state,boards: state.boards.concat(action.res.data.content),pageInfo: {pageNum:data.number+1, pageSize:data.size},fetchResult:data,fetchStatus:"complete"}
        case BOARD_FETCH_FAIL:
            return {...state,fetchStatus:"complete"}
        case BOARD_DELETE_SUCCESS:
            debugger
            return {...state,boards:state.boards.filter((board:Board)=>{return board.boardId != action.boardId})}
        case BOARD_INIT_PAGE_INFO:
            return {...state,pageInfo: action.pageInfo}
        default:
            return state
    }
}