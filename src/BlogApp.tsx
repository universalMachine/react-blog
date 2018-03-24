import * as React from "react"
import RegisterForm from './register/views/register';
import { view as LoginForm } from './login'
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";
import { PostList } from './post'
import AddBoard from './board/views/addBoard';
import BoardList from './board/views/BoardList';
import TopBar from './TopBar';
import {TopicList} from './topic'
import SimpleQuillEditor from './editor/views/SimpleQuillEditor';

function BlogApp() {
    return (
        <BrowserRouter>
            <div>
                <TopBar/>
                <div className="content-layout">
                    <Switch>
                        <Route exact path="/" component={BoardList}></Route>
                        <Route path="/board/add" component={AddBoard}></Route>
                        <Route exact path="/register" component={RegisterForm}></Route>
                        <Route path="/login" component={LoginForm}></Route>
                        <Route exact  path="/board" component={BoardList}></Route>
                        <Route path="/board/topic" component={TopicList}></Route>
                        <Route path="/topic/:topicId/post" component={PostList}></Route>
                        <Route path="/editor" component={SimpleQuillEditor}></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default BlogApp