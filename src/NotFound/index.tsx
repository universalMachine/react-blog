import * as React from "react"


import Loadable from "react-loadable";
const NotFound = Loadable({
    loader: ()=> import(/* webpackChunkName: "NotFound" */"./views/NotFound"),
    loading: ()=>{return <div>Loading...</div>}
})


export {NotFound}
