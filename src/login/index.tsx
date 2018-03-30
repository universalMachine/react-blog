import * as actions from "./actions"
import reducer from "./reducer"

import Loadable from "react-loadable";
import * as React from "react"
const LoginForm = Loadable({
    loader: ()=> import(/* webpackChunkName: "login" */"./views/login").then(result=>{return result}),
    loading: ()=>{return <div>Loading...</div>}
    })
export  {actions,reducer,LoginForm}