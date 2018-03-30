import * as React from "react"
import * as actions from "./actions"
import reducer, { initialState } from "./reducer"

import Loadable from "react-loadable";
import store from '../Store';
import { combineReducers } from 'redux';


const TopicList = Loadable({
    loader: ()=> import(/* webpackChunkName: "topicList" */"./views/topicList").then(result=> {
        const wrappedStore:any = store
        const state = store.getState()
        store.currentReducers = {
            ...wrappedStore.currentReducers,
            topic: reducer
        }
        wrappedStore.resetStore(store.currentReducers,{
            ...state,
            topic: initialState

        })
        return result
    }),
    loading: ()=>{return <div>Loading...</div>}
    })

export {reducer,actions,TopicList}
