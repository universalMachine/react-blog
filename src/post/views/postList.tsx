import * as React from "react"
import { Component } from 'react';
import AddPost from './addPost'
import { connect, Dispatch } from 'react-redux';
import PostItem from './postItem';
import { AnyAction } from 'redux';
import PageInfo from '../../constant/PageInfo';

import InfinityScroll from '../../component/InfinityScroll';
import { deletePost, fetchMainPost, fetchPost } from '../actions';
import MainPostItem from './MainPostItem';
import { formatDate } from '../../constant/time';
import BreadcrumbItem from '../../component/BreadcrumbItem';


class TopicList extends Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={
            pageInfo :{
                pageNum: 0,
                pageSize: 5

            }
        }

        this.fetchNextPage.bind(this)

    }

    fetchNextPage=()=>{
        const {storeState} = this.props
        this.props.fetchPosts({pageNum:storeState.pageInfo.pageNum+1,
            pageSize:storeState.pageInfo.pageSize},this.props.topicId)
    }

    isPostEmpty =()=>{
        return this.props.storeState.posts.topicId == "empty"
    }

    isDiffTopic=(currentTopicId:number)=>{
        return this.props.storeState.posts.topicId != currentTopicId
    }
    componentDidMount(){

        if(this.isPostEmpty() || this.isDiffTopic(this.props.topicId)){
            this.props.fetchMainPost({pageNum:this.state.pageInfo.pageNum+1,
                pageSize:this.state.pageInfo.pageSize},this.props.topicId)

            this.props.fetchPosts({pageNum:this.state.pageInfo.pageNum+1,
                pageSize:this.state.pageInfo.pageSize},this.props.topicId)
        }

    }

    topicList:any[] =[]

    componentWillReceiveProps(nextProps:any,nextContext:any){
        const {storeState} = nextProps
     /*   if(storeState.topics.boardId == this.props.boardId){
            this.topicList = storeState.topics.topicList
        }else{
            this.topicList = []
        }*/
    }
    render(){
        const {storeState} = this.props
        const mainPost = storeState.posts.mainPost
        console.dir(this.props.ownProps)
        //debugger
        return(

            <div className="container">
                <BreadcrumbItem originPath={this.props.location.state.crumbPath} addPath={[{pathName:this.props.location.state.topicName,pathLocation:this.props.location,isCurrentPage:true}]}/>
                {
                    mainPost.map((mainPost:any)=>{
                        return  <MainPostItem key={mainPost.postId} content={mainPost.postText} title={mainPost.postTitle} topicId={mainPost.topicId} deleteTopic={this.props.deleteTopic} />
                    })
                }

                <InfinityScroll fetchNextPage={this.fetchNextPage} data={storeState.fetchResult} fetchStatus={storeState.fetchStatus} loadingFinishTip="评论已经全部显示了哦！">
                {

                    storeState.posts.replyPosts.map((post:any)=>{
                        return <PostItem key={post.postId} item={post} content={post.postText} createTime={formatDate(post.createTime)} title={post.postTitle} postId={post.postId} deleteItem={this.props.deletePost} />
                    })
                }
                </InfinityScroll>
                <AddPost addId={this.props.topicId}></AddPost>
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) => ({
    fetchMainPost:(pageInfo:PageInfo,topicId:number)=>{
        dispatch(fetchMainPost(pageInfo,topicId))
    },
    fetchPosts:(pageInfo:PageInfo,topicId:number)=>{
        dispatch(fetchPost(pageInfo,topicId))
    },
    deletePost: (postId: number) => {
        dispatch(deletePost(postId))
    }

})
const mapStateToProps = (state:any,ownProps:any) =>({
  history: ownProps.history,
    topicId: parseInt(ownProps.match.params.topicId),
    location: ownProps.location,
    storeState: state.post
})
export default connect(mapStateToProps,mapDispatchToProps)(TopicList)