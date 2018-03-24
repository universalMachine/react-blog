import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { initStoreValue } from './constant/constant';
import {reducer as registerReducer} from './register'
import RegisterEpic from "./register/epic"

import {reducer as loginReducer} from "./login"
import loginEpic from "./login/epic"

import {reducer as boardReducer} from "./board"
import boardEpic from "./board/epic"

import {reducer as topicReducer } from "./topic"
import topicEpic from "./topic/epic"

import {reducer as postReducer} from "./post"
import postEpic from "./post/epic"

import { combineEpics, createEpicMiddleware } from 'redux-observable';
import redirectMiddleware from './route/RedirectMiddleware';

const middleWares = []
declare var window: any;
const win = window;

const rootEpic = combineEpics(
    RegisterEpic,
    loginEpic,
    boardEpic,
    topicEpic,
    postEpic
);
const epicMiddleWare = createEpicMiddleware(rootEpic);
//middleWares.push(redirectMiddleware)
middleWares.push(epicMiddleWare)

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middleWares.push( require(`redux-immutable-state-invariant`).default());

    middleWares.push(logger);
}



const nop = (f:  any)=>f;
const redux_dev_tool = (win&&win.__REDUX_DEVTOOLS_EXTENSION__) ? win.__REDUX_DEVTOOLS_EXTENSION__(): nop
const storeEnhancers = compose(applyMiddleware(...middleWares),redux_dev_tool)

const reducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    board: boardReducer,
    topic: topicReducer,
    post: postReducer
})



export default createStore(reducer,initStoreValue,storeEnhancers)