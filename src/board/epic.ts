
import {combineEpics } from 'redux-observable'
import 'rxjs';
import { jsonContentType, serverPath,TryEpic } from "../constant/constant";

import { ofType} from 'redux-observable'
import { ajaxGetJSON, ajaxPost } from 'rxjs/observable/dom/AjaxObservable';

import { Action } from 'rxjs/scheduler/Action';
import { Observable } from 'rxjs/Observable';
import { AjaxResponse } from 'rxjs/Rx';
import { BOARD_ADD, BOARD_DELETE, BOARD_FETCH } from './actionTypes';
import {
    addBoard, addBoardFAIL, addBoardSuccess, deleteBoardFAIL, deleteBoardSuccess, fetchBoardFAIL,
    fetchBoardSuccess
} from './actions';
import { crosAjaxSetting, isResponseValid } from '../constant/ajax';
import { ajax } from 'rxjs/observable/dom/ajax';

const addBoardEpic = (action$:any) =>
    action$.ofType(BOARD_ADD)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting("/board/add","post",action.board)).map(res => {
                console.dir(res);
                if (isResponseValid(res.response))
                    return addBoardSuccess(res.response);
                else
                    return addBoardFAIL(res.response);
            }).catch(error => Observable.of(addBoardFAIL(error))));

const fetchBoardEpic = (action$: any) =>
    action$.ofType(BOARD_FETCH)
        .switchMap((action:any)=>
        ajax(crosAjaxSetting(`/board?pageNum=${action.pageInfo.pageNum}&pageSize=${action.pageInfo.pageSize}`))
        .map(res => {
            console.dir(res);
        if (isResponseValid(res.response))
            return fetchBoardSuccess(res.response)
        else
            return fetchBoardFAIL(res.response)
    }).catch(error => Observable.of(fetchBoardFAIL(error))));

const deleteBoardEpic = (action$: any) =>
    action$.ofType(BOARD_DELETE)
        .switchMap((action:any)=>
            ajax(crosAjaxSetting(`/board/delete?boardId=${action.boardId}`,"delete"))
                .map(res => {
                    console.dir(res);
                    if (isResponseValid(res.response))
                        return deleteBoardSuccess(res.response)
                    else
                        return deleteBoardFAIL(res.response)
                }).catch(error => Observable.of(deleteBoardFAIL(error))));

export default  combineEpics(
    addBoardEpic,
    fetchBoardEpic,
    deleteBoardEpic
);
