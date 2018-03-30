import { applyMiddleware, combineReducers, compose, createStore, StoreEnhancerStoreCreator } from 'redux';
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
import ResetEnhancer from './enhancer/ResetEnhancer';

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
const storeEnhancers = compose<StoreEnhancerStoreCreator<any>>(ResetEnhancer,applyMiddleware(...middleWares),redux_dev_tool)
const originReducer  = {
    register: registerReducer,
    login: loginReducer,
}
 const storeReducer = combineReducers(originReducer)


const store= createStore(storeReducer,initStoreValue,storeEnhancers)
const wrappedStore = {...store,originReducer:originReducer,currentReducers:originReducer}


export default wrappedStore