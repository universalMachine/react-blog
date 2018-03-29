import * as React from "react"
import { Component } from 'react';
import AddTopic from './addTopic'
import { connect, Dispatch } from 'react-redux';
import TopicItem from './topicItem';
import { AnyAction } from 'redux';
import PageInfo from '../../constant/PageInfo';
import { TOPIC_FETCH } from '../actionTypes';
import { deleteTopic, fetchTopic } from '../actions';
import InfinityScroll from '../../component/InfinityScroll';
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
        this.props.fetchTopics({pageNum:storeState.pageInfo.pageNum+1,
            pageSize:storeState.pageInfo.pageSize},this.props.boardId)
    }

    navToPost = (topicId:number,topicName:string)=>{
        this.props.history.push({pathname:`/topic/${topicId}/post`,state:{
                crumbPath: this.crumbPath,
                topicName: topicName
            }})
    }

    isEmpty = ()=>{
        const {storeState} = this.props
        return storeState.topics.topicList.isEmpty
    }
    isStoreSameBoard = ()=>{
        const {storeState} = this.props
        return storeState.topics.boardId === this.props.boardId

    }
    componentDidMount(){
        debugger
        if(this.isEmpty() || !this.isStoreSameBoard()){
            this.props.fetchTopics({pageNum:this.state.pageInfo.pageNum+1,
                pageSize:this.state.pageInfo.pageSize},this.props.boardId)
        }

    }

    topicList:any[] =[]

    crumbPath = [] as any[]
    getCrumbPath= (path:any)=>{
        this.crumbPath = path
    }

    componentWillReceiveProps(nextProps:any,nextContext:any){
        const {storeState} = nextProps
        if(storeState.topics.boardId == this.props.boardId){
            this.topicList = storeState.topics.topicList
        }else{
            this.topicList = []
        }
    }
    render(){
        const {storeState,location} = this.props
        console.dir(location)




        return(
            <div className="container">

                <BreadcrumbItem originPath={[{pathName:"版块",pathUrl:"/board"}]} addPath={[{pathName:this.props.name,pathLocation:this.props.location,isCurrentPage:true}]} getPath={this.getCrumbPath}/>
                <InfinityScroll fetchNextPage={this.fetchNextPage} data={storeState.fetchResult} fetchStatus={storeState.fetchStatus}>
                {
                    storeState.topics.topicList.map((topic:any)=>{
                        return <TopicItem key={topic.topicId} content={topic.topicDesc} title={topic.topicTitle} topicId={topic.topicId} deleteTopic={this.props.deleteTopic}
                        itemOnClick={()=>this.navToPost(topic.topicId,topic.topicTitle)}/>
                    })
                }
                </InfinityScroll>
                <AddTopic boardId={this.props.boardId}></AddTopic>
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) => ({
    fetchTopics:(pageInfo:PageInfo,boardId:number)=>{
        dispatch(fetchTopic(pageInfo,boardId))
    },
    deleteTopic: (topicId: number) => {
        dispatch(deleteTopic(topicId))
    }

})
const mapStateToProps = (state:any,ownProps:any) =>({
    history: ownProps.history,
    boardId: parseInt(new URLSearchParams(ownProps.location.search).get("boardId")),
    name: ownProps.location.state.boardName,
    location: ownProps.location,
    storeState: state.topic
})
export default connect(mapStateToProps,mapDispatchToProps)(TopicList)