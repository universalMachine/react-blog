
import {combineEpics } from 'redux-observable'
import 'rxjs';
import { jsonContentType, pageUrlPrefix, serverPath, TryEpic } from "../constant/constant";
import { TOPIC_ADD, TOPIC_DELETE, TOPIC_FETCH } from "./actionTypes";
import { ofType} from 'redux-observable'
import { ajaxGetJSON, ajaxPost } from 'rxjs/observable/dom/AjaxObservable';
import {
    addTopicFAIL, addTopicSuccess, deleteTopicFail, deleteTopicSuccess, fetchTopicFAIL,
    fetchTopicSuccess
} from './actions';
import { Action } from 'rxjs/scheduler/Action';
import { Observable } from 'rxjs/Observable';
import { AjaxResponse } from 'rxjs/Rx';
import { crosAjaxSetting, isResponseValid } from '../constant/ajax';
import { ajax } from 'rxjs/observable/dom/ajax';

let addTopicEpic = (action$:any) =>
    action$.ofType(TOPIC_ADD)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting("/topic/add","post",action.topic)).map(res => {
                console.dir(res);
                if (isResponseValid(res.response))
                    return addTopicSuccess(res.response);
                else
                    return addTopicFAIL(res.response);
            }).catch(error => Observable.of(addTopicFAIL(error))));
let fetchTopicEpic = (action$:any) =>
    action$.ofType(TOPIC_FETCH)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting(`/topic/${action.boardId}?pageNum=${action.pageInfo.pageNum}&pageSize=${action.pageInfo.pageSize}`))

        .map(res=> {console.dir(res);
                if (isResponseValid(res.response))
                    return fetchTopicSuccess(res.response);
                else
                    return fetchTopicFAIL(res.response);
            }).catch(error => Observable.of(fetchTopicFAIL(error))));
let deleteTopicEpic = (action$:any) =>
    action$.ofType(TOPIC_DELETE)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting(`/topic/delete/${action.topicId}`,"delete"))

                .map(res=> {console.dir(res);
                    if (isResponseValid(res.response))
                        return deleteTopicSuccess(res.response);
                    else
                        return deleteTopicFail(res.response);
                }).catch(error => Observable.of(deleteTopicFail(error))));

export default combineEpics(
    addTopicEpic,
    fetchTopicEpic,
    deleteTopicEpic
);
