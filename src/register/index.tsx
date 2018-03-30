import * as actions from "./actions"
import reducer from "./reducer"
import view from './views/register'
import Loadable from "react-loadable";
import * as React from "react"
const RegisterForm = Loadable({
    loader: ()=> import(/* webpackChunkName: "registerForm" */"./views/register").then(result=>{return result}),
    loading: ()=>{return <div>Loading...</div>}
    })
export  {actions,reducer,RegisterForm}