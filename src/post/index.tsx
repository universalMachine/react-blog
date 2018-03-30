
import * as actions from "./actions"
import reducer from "./reducer"

import Loadable from "react-loadable";
import * as React from "react"

const PostList = Loadable({
    loader: ()=> import(/* webpackChunkName: "postList" */"./views/postList"),
    loading: ()=>{return <div>Loading...</div>}
    })

export {reducer,actions,PostList}
