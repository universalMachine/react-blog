import * as actions from "./actions"
import reducer from "./reducer"
import * as React from "react"
import AddBoard from "./views/addBoard"
import Loadable from 'react-loadable';
const BoardList = Loadable({
    loader: ()=> import(/* webpackChunkName: "BoardList" */"./views/BoardList"),
    loading: ()=>{return <div>Loading...</div>}
})


export {AddBoard,actions,reducer,BoardList}
