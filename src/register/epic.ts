import {combineEpics } from 'redux-observable'
import 'rxjs';
import { jsonContentType, serverPath, TryEpic } from "../constant/constant";
import { REGISTER_ADD, REGISTER_FAIL } from "./actionTypes";
import { ofType} from 'redux-observable'
import { ajaxGetJSON, ajaxPost } from 'rxjs/observable/dom/AjaxObservable';
import { registerFail, registerSuccess } from './actions';
import { LoginFail } from '../login/actions';
import { Observable } from 'rxjs/Observable';
import { crosAjaxSetting, isResponseValid } from '../constant/ajax';
import { ajax } from 'rxjs/observable/dom/ajax';


let registerEpic = (action$:any) =>
    action$.ofType(REGISTER_ADD)
        .switchMap((action :any) =>
            ajax(crosAjaxSetting("/register","post",action.user))
                .map(res => {
                    console.dir(res);
                    if (isResponseValid(res.response))
                        return registerSuccess(res);
                    else
                        return registerFail(res);
                }).catch(error => Observable.of(registerFail(error))));

export default  combineEpics(
    registerEpic
);