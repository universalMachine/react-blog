import {combineEpics } from 'redux-observable'
import 'rxjs';
import { jsonContentType, serverPath,TryEpic } from "../constant/constant";
import {LOGIN_ADD} from "./actionTypes";
import { ofType} from 'redux-observable'
import { ajaxGetJSON, ajaxPost } from 'rxjs/observable/dom/AjaxObservable';
import { LoginFail, loginSuccess } from './actions';
import { Action } from 'rxjs/scheduler/Action';
import { Observable } from 'rxjs/Observable';
import { AjaxResponse } from 'rxjs/Rx';
import { crosAjaxSetting, isResponseValid } from '../constant/ajax';
import { ajax } from 'rxjs/observable/dom/ajax';


let loginEpic = (action$:any) =>
    action$.ofType(LOGIN_ADD)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting("/login","post",action.user)).map(res => {
                    console.dir(res.response);
                    if (isResponseValid(res.response))
                        return loginSuccess(res);
                    else
                        return LoginFail(res);
                }).catch(error => Observable.of(LoginFail(error))));

export default  combineEpics(
    loginEpic
);