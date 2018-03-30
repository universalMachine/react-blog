import * as actions from "./actions"
import reducer, { initialState } from "./reducer"
import * as React from "react"
import AddBoard from "./views/addBoard"
import Loadable from 'react-loadable';
import store from "../Store"
import { combineReducers } from 'redux';


const BoardList = Loadable({
    loader: ()=> import(/* webpackChunkName: "BoardList" */"./views/BoardList").then(result=> {
        const wrappedStore:any = store
        const state = store.getState()


        wrappedStore.resetStore(combineReducers({
            ...store.originReducer,
            board: reducer,
    }),{
            ...state,
            board: initialState

        })
        return result
    }),
    loading: ()=>{return <div>Loading...</div>}
})


export {AddBoard,actions,reducer,BoardList}
