import * as React from "react"
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";
import  * as Loadable from 'react-loadable';


import RegisterForm from './register/views/register';
import { view as LoginForm } from './login'


import AddBoard from './board/views/addBoard';

import { PostList } from './post'
import {BoardList} from './board';
import {TopicList} from './topic'
import {NotFound} from './NotFound';

let loadableTopBar = Loadable({
    loader: () => import( /* webpackChunkName: "topBar" */"./TopBar"),
    loading: ()=>{
        return <div>Loading...</div>
    }
})




function BlogApp() {
    return (
        <BrowserRouter>
            <div>

                {React.createElement(loadableTopBar)}
                <div className="content-layout">
                    <Switch>
                        <Route exact path="/" component={BoardList}></Route>
                        <Route path="/board/add" component={AddBoard}></Route>
                        <Route exact path="/register" component={RegisterForm}></Route>
                        <Route path="/login" component={LoginForm}></Route>
                        <Route exact  path="/board" component={BoardList}></Route>
                        <Route path="/board/topic" component={TopicList}></Route>
                        <Route path="/topic/:topicId/post" component={PostList}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default BlogApp