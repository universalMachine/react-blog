import {
    BOARD_ADD, BOARD_ADD_Authentication_FAIL, BOARD_ADD_FAIL, BOARD_ADD_STATUS_RESET, BOARD_ADD_SUCCESS, BOARD_DELETE,
    BOARD_DELETE_FAIL,
    BOARD_DELETE_SUCCESS,
    BOARD_FETCH,
    BOARD_FETCH_FAIL,
    BOARD_FETCH_SUCCESS, BOARD_INIT_PAGE_INFO
} from './actionTypes';
import { Board } from './Board';
import PageInfo from '../constant/PageInfo';

export const fetchBoard = (pageInfo:PageInfo)=>({
    type: BOARD_FETCH,
    pageInfo: pageInfo
})

export const fetchBoardSuccess = (res:any)=>({
    type: BOARD_FETCH_SUCCESS,
    res: res
})


export const fetchBoardFAIL =(res:any)=>({
    type: BOARD_FETCH_FAIL
})

export const addBoard = (board:Board)=>({
    type: BOARD_ADD,
    board: board
})


export const addBoardSuccess = (res:any)=>({
    type: BOARD_ADD_SUCCESS,
    board: res.board,
    res: res
})


export const addBoardFAIL =(res:any)=> ({
    type: BOARD_ADD_FAIL,
    res: res
})


export const resetBoardAddStatus =()=> ({
    type: BOARD_ADD_STATUS_RESET
})


export const boardAuthenFAIL =(res:any)=> ({
    type: BOARD_ADD_Authentication_FAIL
})

export const initPageInfo = (pageInfo:PageInfo)=>({
    type: BOARD_INIT_PAGE_INFO,
    pageInfo: pageInfo
})

export const deleteBoard = (boardId: number)=>({
  type: BOARD_DELETE,
  boardId: boardId
})

export const deleteBoardSuccess = (res:any)=>({
    type: BOARD_DELETE_SUCCESS,
    res: res,
    boardId: res.extra.boardId
})


export const deleteBoardFAIL =(res:any)=> ({
    type: BOARD_DELETE_FAIL,
    res: res
})

