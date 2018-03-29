
import {combineEpics } from 'redux-observable'
import 'rxjs';
import { jsonContentType, pageUrlPrefix, serverPath, TryEpic } from "../constant/constant";
import { MainPost_FETCH, POST_ADD, POST_DELETE, POST_FETCH } from "./actionTypes";
import { ofType} from 'redux-observable'
import { ajaxGetJSON, ajaxPost } from 'rxjs/observable/dom/AjaxObservable';
import {
    addPostFail, addPostSuccess, deletePostFail, deletePostSuccess, fetchMainPostFail, fetchMainPostSuccess,
    fetchPostSuccess, fetchPostFail
} from './actions';
import { Action } from 'rxjs/scheduler/Action';
import { Observable } from 'rxjs/Observable';
import { AjaxResponse } from 'rxjs/Rx';
import { crosAjaxSetting, isResponseValid } from '../constant/ajax';
import { ajax } from 'rxjs/observable/dom/ajax';
import { TOPIC_FETCH } from '../topic/actionTypes';
import { fetchTopicFAIL, fetchTopicSuccess } from '../topic/actions';

let addPostEpic = (action$:any) =>
    action$.ofType(POST_ADD)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting("/post/add","post",action.post)).map(res => {
                console.dir(res);
                if (isResponseValid(res.response))
                    return addPostSuccess(res.response);
                else
                    return addPostFail(res.response);
            }).catch(error => Observable.of(addPostFail(error))));

let fetchMainPostEpic = (action$:any) =>
    action$.ofType(MainPost_FETCH)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting(`/${action.topicId}/mainPost?pageNum=1&pageSize=1`))
                .map(res=> {console.dir(res);
                    if (isResponseValid(res.response))
                        return fetchMainPostSuccess(res.response);
                    else
                        return fetchMainPostFail(res.response);
                }).catch(error => Observable.of(fetchMainPostFail(error))));
let fetchPostEpic = (action$:any) =>
    action$.ofType(POST_FETCH)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting(`/${action.topicId}/replyPost?pageNum=${action.pageInfo.pageNum}&pageSize=${action.pageInfo.pageSize}`))

                .map(res=> {console.dir(res);
                    if (isResponseValid(res.response))
                        return fetchPostSuccess(res.response);
                    else
                        return fetchPostFail(res.response);
                }).catch(error => Observable.of(fetchPostFail(error))));

let deletePostEpic = (action$:any) =>
    action$.ofType(POST_DELETE)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting(`/post/delete?postId=${action.postId}`,"delete"))
                .map(res=> {console.dir(res);
                    if (isResponseValid(res.response))
                        return deletePostSuccess(res.response);
                    else
                        return deletePostFail(res.response);
                }).catch(error => Observable.of(deletePostFail(error))));

export default combineEpics(
    addPostEpic,
    fetchPostEpic,
    fetchMainPostEpic,
    deletePostEpic
);
