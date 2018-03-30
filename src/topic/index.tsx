import * as React from "react"
import * as actions from "./actions"
import reducer from "./reducer"

import Loadable from "react-loadable";
const TopicList = Loadable({
    loader: ()=> import(/* webpackChunkName: "topicList" */"./views/topicList"),
    loading: ()=>{return <div>Loading...</div>}
    })


export {reducer,actions,TopicList}
