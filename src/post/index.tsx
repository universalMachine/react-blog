
import * as actions from "./actions"

import reducer, { initialState } from "./reducer"
import Loadable from "react-loadable";
import * as React from "react"
import store from '../Store';
import { combineReducers } from 'redux';


const PostList = Loadable({
    loader: ()=> import(/* webpackChunkName: "postList" */"./views/postList").then(result=> {
        const wrappedStore:any = store
        const state = store.getState()
        store.currentReducers = {
            ...wrappedStore.currentReducers,
            post: reducer
        }
        wrappedStore.resetStore(store.currentReducers,{
            ...state,
            post: initialState

        })
        return result
    }),
      loading: ()=>{return <div>Loading...</div>}
    })

/*const reducer = Loadable({
    loader: ()=> import(/!* webpackChunkName: "postReducer" *!/"./reducer"),
    loading: ()=>{return <div>Loading...</div>}
})*/

export { reducer,actions,PostList}
